import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { DeepSeekTokenUsageBalanceChargeCommand } from 'features/payment/DeepSeekTokenUsageBalanceCharge.command'
import { OpenAiTokenUsageBalanceChargeCommand } from 'features/payment/OpenAiTokenUsageBalanceCharge.command'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { CurrentSubscriptionServiceModel } from 'models/auth/auth.service.model'
import { DailyTranslationLimitService } from './DailyTranslationLimit.service'
import { parseSentenceTranslationResult } from './parseSentenceTranslationResult'
import { SentenceTranslationAccess, SentenceTranslationAccessService } from './SentenceTranslationAccess.service'
import {
	SentenceTranslationProvider,
	SentenceTranslationProviderName,
	SentenceTranslationProviderUsage,
} from './SentenceTranslationProvider'
import { StreamTranslateWithChatGPT } from './StreamTranslateWithChatGPT.service'
import { StreamTranslateWithDeepSeek } from './StreamTranslateWithDeepSeek.service'

export type TranslateSentenceInput = {
	userId: null | number
	currentSubscription?: null | CurrentSubscriptionServiceModel
	sentenceId: number
	text: string
	sourceLanguageCode?: null | string
	targetLanguageCode?: null | string
	bookName?: string
	bookAuthor?: string
	videoName?: string
	videoYear?: string | number
}

export type TranslateSentenceResult = {
	translatedText: string
}

export type TranslateSentenceStreamEvent =
	| { type: 'chunk'; text: string }
	| { type: 'done' }
	| { type: 'error'; message: string }

export class TranslateSentenceCommand implements ICommand {
	constructor(public input: TranslateSentenceInput) {}
}

@CommandHandler(TranslateSentenceCommand)
export class TranslateSentenceHandler implements ICommandHandler<TranslateSentenceCommand> {
	constructor(
		private streamTranslateWithDeepSeek: StreamTranslateWithDeepSeek,
		private streamTranslateWithChatGPT: StreamTranslateWithChatGPT,
		private sentenceTranslationRepository: SentenceTranslationRepository,
		private sentenceTranslationAccessService: SentenceTranslationAccessService,
		private dailyTranslationLimitService: DailyTranslationLimitService,
		private commandBus: CommandBus,
	) {}

	async execute(command: TranslateSentenceCommand): Promise<TranslateSentenceResult> {
		const events = this.streamTranslate({ ...command.input })

		let translatedText = ''

		for await (const event of events) {
			if (event.type === 'chunk') {
				translatedText += event.text
			}
			if (event.type === 'error') {
				throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
			}
		}

		return {
			translatedText,
		}
	}

	async *streamTranslate(
		input: TranslateSentenceInput & { abortSignal?: AbortSignal },
	): AsyncGenerator<TranslateSentenceStreamEvent> {
		try {
			const preparedInput = await this.prepareTranslationOrThrow(input)

			if (preparedInput.existingTranslationText) {
				yield { type: 'chunk', text: preparedInput.existingTranslationText }
				yield { type: 'done' }
				return
			}

			const draftSentenceTranslation = await this.createDraftSentenceTranslation(input.sentenceId)

			const translationResult = yield* this.streamProviderTextAndPersistDraft({
				provider: preparedInput.provider,
				sentenceTranslationId: draftSentenceTranslation.id,
				text: input.text,
				sourceLanguageCode: preparedInput.sourceLanguageCode,
				targetLanguageCode: preparedInput.targetLanguageCode,
				abortSignal: input.abortSignal,
				lowPriority: preparedInput.lowPriority,
				bookName: input.bookName,
				bookAuthor: input.bookAuthor,
				videoName: input.videoName,
				videoYear: input.videoYear,
			})

			await this.saveFinalTranslationOrThrow({
				sentenceTranslationId: draftSentenceTranslation.id,
				fullText: translationResult.fullText,
			})

			await this.chargeAfterTranslationIfNeeded({
				userId: input.userId,
				chargeAfterTranslation: preparedInput.createMode === 'subscriptionBalance',
				usage: translationResult.usage,
			})

			yield { type: 'done' }
		} catch (error) {
			console.log('Error in TranslateSentenceHandler => streamTranslate')
			console.error(error)

			const message = error instanceof Error ? error.message : 'Unknown error'
			yield { type: 'error', message }
		}
	}

	private async prepareTranslationOrThrow(input: TranslateSentenceInput): Promise<{
		existingTranslationText: null | string
		sourceLanguageCode: string
		targetLanguageCode: string
		lowPriority: boolean
		provider: SentenceTranslationProvider
		createMode: SentenceTranslationAccess['createMode']
	}> {
		const access = await this.sentenceTranslationAccessService.resolveAccessOrThrow({
			userId: input.userId,
			currentSubscription: input.currentSubscription ?? null,
			sentenceId: input.sentenceId,
		})
		const existingTranslation = await this.sentenceTranslationRepository.getFirstSentenceTranslationBySentenceId(
			input.sentenceId,
		)

		if (existingTranslation) {
			await this.ensureCanReadExistingTranslationOrThrow({
				userId: input.userId,
				sentenceId: input.sentenceId,
				access,
			})

			return {
				existingTranslationText: this.buildStoredTranslationText(existingTranslation),
				sourceLanguageCode: input.sourceLanguageCode ?? 'en',
				targetLanguageCode: input.targetLanguageCode ?? 'ru',
				lowPriority: true,
				provider: this.getTranslationProvider(),
				createMode: access.createMode,
			}
		}

		await this.ensureCanCreateNewTranslationOrThrow({
			userId: input.userId,
			sentenceId: input.sentenceId,
			access,
		})

		return {
			existingTranslationText: null,
			sourceLanguageCode: input.sourceLanguageCode ?? 'en',
			targetLanguageCode: input.targetLanguageCode ?? 'ru',
			lowPriority: true,
			provider: this.getTranslationProvider(),
			createMode: access.createMode,
		}
	}

	private getTranslationProvider(): SentenceTranslationProvider {
		const providerName: SentenceTranslationProviderName = 'deepseek'

		const providers: Record<SentenceTranslationProviderName, SentenceTranslationProvider> = {
			deepseek: this.streamTranslateWithDeepSeek,
			chatgpt: this.streamTranslateWithChatGPT,
		}

		return providers[providerName]
	}

	private async createDraftSentenceTranslation(sentenceId: number) {
		return this.sentenceTranslationRepository.createSentenceTranslation({
			sentenceId,
			translation: '',
			analysis: null,
		})
	}

	private async *streamProviderTextAndPersistDraft(input: {
		provider: SentenceTranslationProvider
		sentenceTranslationId: number
		text: string
		sourceLanguageCode: string
		targetLanguageCode: string
		abortSignal?: AbortSignal
		lowPriority: boolean
		bookName?: string
		bookAuthor?: string
		videoName?: string
		videoYear?: string | number
	}): AsyncGenerator<
		TranslateSentenceStreamEvent,
		{
			fullText: string
			usage: null | SentenceTranslationProviderUsage
		}
	> {
		let fullText = ''
		let lastPersistAtMs = 0

		try {
			for await (const event of input.provider.streamTranslate({
				text: input.text,
				sourceLanguageCode: input.sourceLanguageCode,
				targetLanguageCode: input.targetLanguageCode,
				abortSignal: input.abortSignal,
				lowPriority: input.lowPriority,
				bookName: input.bookName,
				bookAuthor: input.bookAuthor,
				videoName: input.videoName,
				videoYear: input.videoYear,
			})) {
				if (event.type === 'chunk') {
					fullText += event.text
					yield { type: 'chunk', text: event.text }

					lastPersistAtMs = await this.persistPartialTranslationIfNeeded({
						sentenceTranslationId: input.sentenceTranslationId,
						fullText,
						lastPersistAtMs,
					})

					continue
				}

				return {
					fullText,
					usage: event.usage,
				}
			}

			return {
				fullText,
				usage: null,
			}
		} catch (error) {
			await this.deleteDraftSentenceTranslationIfExists(input.sentenceTranslationId)
			throw error
		}
	}

	private async persistPartialTranslationIfNeeded(input: {
		sentenceTranslationId: number
		fullText: string
		lastPersistAtMs: number
	}) {
		const nowMs = Date.now()
		if (nowMs - input.lastPersistAtMs < 1000) {
			return input.lastPersistAtMs
		}

		const partialResult = parseSentenceTranslationResult(input.fullText, {
			requireTranslation: false,
		})
		if (!partialResult) {
			return input.lastPersistAtMs
		}

		await this.sentenceTranslationRepository.updateSentenceTranslationById(input.sentenceTranslationId, {
			translation: partialResult.translation,
			analysis: partialResult.analysis,
		})

		return nowMs
	}

	private async saveFinalTranslationOrThrow(input: { sentenceTranslationId: number; fullText: string }) {
		const parsedResult = parseSentenceTranslationResult(input.fullText)
		if (!parsedResult) {
			await this.deleteDraftSentenceTranslationIfExists(input.sentenceTranslationId)
			throw new CustomGraphQLError(errorMessage.unknownOpenAIError, ErrorCode.InternalServerError_500)
		}

		await this.sentenceTranslationRepository.updateSentenceTranslationById(input.sentenceTranslationId, {
			translation: parsedResult.translation,
			analysis: parsedResult.analysis,
		})
	}

	private async chargeAfterTranslationIfNeeded(input: {
		userId: null | number
		chargeAfterTranslation: boolean
		usage: null | SentenceTranslationProviderUsage
	}) {
		if (!input.userId || !input.chargeAfterTranslation || input.usage === null) {
			return
		}

		if (input.usage.provider === 'deepseek') {
			await this.commandBus.execute(
				new DeepSeekTokenUsageBalanceChargeCommand({
					userId: input.userId,
					inputTokens: input.usage.inputTokens,
					outputTokens: input.usage.outputTokens,
				}),
			)

			return
		} else if (input.usage.provider === 'chatgpt') {
			await this.commandBus.execute(
				new OpenAiTokenUsageBalanceChargeCommand({
					userId: input.userId,
					aiModelName: input.usage.model,
					inputTokens: input.usage.inputTokens,
					outputTokens: input.usage.outputTokens,
					lowPriority: input.usage.lowPriority,
				}),
			)
		}
	}

	private async deleteDraftSentenceTranslationIfExists(sentenceTranslationId: number) {
		try {
			await this.sentenceTranslationRepository.deleteSentenceTranslationById(sentenceTranslationId)
		} catch (error) {
			console.error('Failed to delete draft sentence translation')
			console.error(error)
		}
	}

	private async ensureCanReadExistingTranslationOrThrow(input: {
		userId: null | number
		sentenceId: number
		access: SentenceTranslationAccess
	}) {
		await this.ensureModeIsAllowedOrThrow({
			mode: input.access.readMode,
			deniedReason: input.access.readDeniedReason,
			actionType: 'read',
		})

		if (input.access.readMode === 'dailyLimit') {
			await this.consumeDailyLimitOrThrow(input)
		}
	}

	private async ensureCanCreateNewTranslationOrThrow(input: {
		userId: null | number
		sentenceId: number
		access: SentenceTranslationAccess
	}) {
		await this.ensureModeIsAllowedOrThrow({
			mode: input.access.createMode,
			deniedReason: input.access.createDeniedReason,
			actionType: 'create',
		})

		if (input.access.createMode === 'dailyLimit') {
			await this.consumeDailyLimitOrThrow(input)
		}
	}

	private async ensureModeIsAllowedOrThrow(input: {
		mode: SentenceTranslationAccess['createMode']
		deniedReason?: SentenceTranslationAccess['createDeniedReason']
		actionType: 'create' | 'read'
	}) {
		if (input.mode !== 'forbidden') {
			return
		}

		if (input.deniedReason === 'userIsNotOwner') {
			throw new CustomGraphQLError(
				errorMessage.sentenceTranslation.userCannotAccessForeignPrivateMedia,
				ErrorCode.Forbidden_403,
			)
		}

		if (input.deniedReason === 'privateTranslationRequiresStandardBalance') {
			throw new CustomGraphQLError(
				errorMessage.sentenceTranslation.privateTranslationRequiresStandardSubscriptionBalance,
				ErrorCode.Forbidden_403,
			)
		}

		if (input.actionType === 'read') {
			throw new CustomGraphQLError(
				errorMessage.sentenceTranslation.anonymousUserCannotTranslate,
				ErrorCode.Unauthorized_401,
			)
		}

		throw new CustomGraphQLError(
			errorMessage.sentenceTranslation.anonymousUserCannotTranslate,
			ErrorCode.Unauthorized_401,
		)
	}

	private async consumeDailyLimitOrThrow(input: { userId: null | number; sentenceId: number }) {
		if (!input.userId) {
			throw new CustomGraphQLError(
				errorMessage.sentenceTranslation.anonymousUserCannotTranslate,
				ErrorCode.Unauthorized_401,
			)
		}

		const limitResult = await this.dailyTranslationLimitService.tryCountSentenceToday({
			userId: input.userId,
			sentenceId: input.sentenceId,
		})

		if (!limitResult.allowed) {
			throw new CustomGraphQLError(errorMessage.sentenceTranslation.dailyLimitReached, ErrorCode.Forbidden_403)
		}
	}

	private buildStoredTranslationText(input: { translation: string; analysis: null | string }) {
		return input.analysis ? `${input.translation}\n\n${input.analysis}` : input.translation
	}
}
