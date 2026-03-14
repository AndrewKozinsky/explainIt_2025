import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { SentenceRepository } from 'repo/sentence.repository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { SubscriptionBalanceTransactionRepository } from 'repo/subscriptionBalanceTransaction.repository'
import { DeepSeekTokenUsageBalanceChargeCommand } from 'features/payment/DeepSeekTokenUsageBalanceCharge.command'
import { OpenAiTokenUsageBalanceChargeCommand } from 'features/payment/OpenAiTokenUsageBalanceCharge.command'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { parseSentenceTranslationResult } from './parseSentenceTranslationResult'
import {
	SentenceTranslationProvider,
	SentenceTranslationProviderName,
	SentenceTranslationProviderUsage,
} from './SentenceTranslationProvider'
import { StreamTranslateWithChatGPT } from './StreamTranslateWithChatGPT.service'
import { StreamTranslateWithDeepSeek } from './StreamTranslateWithDeepSeek.service'

export type TranslateSentenceInput = {
	userId: number
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
		private sentenceRepository: SentenceRepository,
		private sentenceTranslationRepository: SentenceTranslationRepository,
		private subscriptionBalanceTransactionRepository: SubscriptionBalanceTransactionRepository,
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
				chargeAfterTranslation: preparedInput.chargeAfterTranslation,
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

	private async prepareTranslationOrThrow(input: TranslateSentenceInput) {
		const chargeAfterTranslation = await this.shouldChargeAfterTranslationOrThrow({
			sentenceId: input.sentenceId,
		})

		if (chargeAfterTranslation) {
			await this.subscriptionBalanceTransactionRepository.ensureCanTranslatePrivateMediaOrThrow({
				userId: input.userId,
				minBalanceInKopecks: 10,
			})
		}

		const existingTranslation = await this.sentenceTranslationRepository.getFirstSentenceTranslationBySentenceId(
			input.sentenceId,
		)

		if (existingTranslation) {
			throw new CustomGraphQLError(errorMessage.sentenceTranslation.alreadyExists, ErrorCode.BadRequest_400)
		}

		return {
			chargeAfterTranslation,
			sourceLanguageCode: input.sourceLanguageCode ?? 'en',
			targetLanguageCode: input.targetLanguageCode ?? 'ru',
			lowPriority: true,
			provider: this.getTranslationProvider(),
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
		userId: number
		chargeAfterTranslation: boolean
		usage: null | SentenceTranslationProviderUsage
	}) {
		if (!input.chargeAfterTranslation || input.usage === null) {
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

	private async shouldChargeAfterTranslationOrThrow(input: { sentenceId: number }): Promise<boolean> {
		const sentenceDb = await this.sentenceRepository.getSentenceDbById(input.sentenceId)
		if (!sentenceDb) {
			throw new CustomGraphQLError(errorMessage.sentence.notFound, ErrorCode.NotFound_404)
		}

		const isPublicBook = Boolean(sentenceDb.bookChapter?.book_public_id)
		const isPublicVideo = Boolean(sentenceDb.video_public_id)
		const isPublicMedia = isPublicBook || isPublicVideo

		return !isPublicMedia
	}
}
