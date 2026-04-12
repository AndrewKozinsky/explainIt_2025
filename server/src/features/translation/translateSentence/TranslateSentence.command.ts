import { Inject } from '@nestjs/common'
import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { DeepSeekTokenUsageBalanceChargeCommand } from 'features/payment/DeepSeekTokenUsageBalanceCharge.command'
import { OpenAiTokenUsageBalanceChargeCommand } from 'features/payment/OpenAiTokenUsageBalanceCharge.command'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { CurrentSubscriptionServiceModel } from 'models/auth/auth.service.model'
import { DailyTranslationLimitService } from '../translate/DailyTranslationLimit.service'
import {
	SentenceTranslationAccess,
	SentenceTranslationAccessService,
} from '../translate/SentenceTranslationAccess.service'
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
		@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
	) {}

	async execute(command: TranslateSentenceCommand): Promise<TranslateSentenceResult> {
		try {
			const preparedInput = await this.prepareTranslationOrThrow(command.input)

			const draftSentenceTranslation = await this.createDraftSentenceTranslation(command.input.sentenceId)

			const translationResult = await this.generateSentenceTranslation({
				provider: preparedInput.provider,
				text: command.input.text,
				sourceLanguageCode: preparedInput.sourceLanguageCode,
				targetLanguageCode: preparedInput.targetLanguageCode,
				lowPriority: preparedInput.lowPriority,
				bookName: command.input.bookName,
				bookAuthor: command.input.bookAuthor,
				videoName: command.input.videoName,
				videoYear: command.input.videoYear,
			})

			const finalizedTranslation = translationResult.fullText.trim()

			if (!finalizedTranslation) {
				await this.deleteDraftSentenceTranslationIfExists(draftSentenceTranslation.id)
				throw new CustomGraphQLError(errorMessage.unknownOpenAIError, ErrorCode.InternalServerError_500)
			}

			await this.saveFinalTranslation({
				sentenceTranslationId: draftSentenceTranslation.id,
				translation: finalizedTranslation,
			})

			await this.chargeAfterTranslationIfNeeded({
				userId: command.input.userId,
				chargeAfterTranslation: preparedInput.createMode === 'subscriptionBalance',
				usage: translationResult.usage,
			})

			return {
				translatedText: finalizedTranslation,
			}
		} catch (error) {
			console.log('Error in TranslateSentenceHandler => execute')
			console.error(error)

			if (error instanceof CustomGraphQLError) {
				throw error
			}

			this.logger.info('Error while translating sentence', {
				message: error instanceof Error ? error.message : 'Unknown error',
			})

			throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
		}
	}

	private async prepareTranslationOrThrow(input: TranslateSentenceInput): Promise<{
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

		await this.ensureCanCreateNewTranslationOrThrow({
			userId: input.userId,
			sentenceId: input.sentenceId,
			access,
		})

		return {
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
		})
	}

	private async generateSentenceTranslation(input: {
		provider: SentenceTranslationProvider
		text: string
		sourceLanguageCode: string
		targetLanguageCode: string
		lowPriority: boolean
		bookName?: string
		bookAuthor?: string
		videoName?: string
		videoYear?: string | number
	}): Promise<{
		fullText: string
		usage: null | SentenceTranslationProviderUsage
	}> {
		const result = await input.provider.translate({
			text: input.text,
			sourceLanguageCode: input.sourceLanguageCode,
			targetLanguageCode: input.targetLanguageCode,
			lowPriority: input.lowPriority,
			bookName: input.bookName,
			bookAuthor: input.bookAuthor,
			videoName: input.videoName,
			videoYear: input.videoYear,
		})

		return {
			fullText: result.translatedText,
			usage: result.usage,
		}
	}

	private async saveFinalTranslation(input: { sentenceTranslationId: number; translation: string }) {
		await this.sentenceTranslationRepository.updateSentenceTranslationById(input.sentenceTranslationId, {
			translation: input.translation,
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
}
