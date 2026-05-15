import { Inject } from '@nestjs/common'
import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { ErrorStatusCode } from 'src/infrastructure/exceptions/errorStatusCode'
import {
	SentenceTranslationAccess,
	SentenceTranslationAccessService,
} from 'features/translation/translateCommon/SentenceTranslationAccess.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { LanguageCode } from 'prisma/generated/enums'
import { TranslateWithChatGPT } from '../translateCommon/TranslateWithChatGPT.service'
import { TranslateWithDeepSeek } from '../translateCommon/TranslateWithDeepSeek.service'
import { TranslateWithGemini } from '../translateCommon/TranslateWithGemini.service'
import {
	chargeAfterTranslationIfNeeded,
	ensureCanChargeBalanceOrThrow,
	ensureModeIsAllowedOrThrow,
} from '../translateCommon/TranslationHandler.utils'
import { SentenceTranslationProvider, TranslationProviderName } from '../translateCommon/TranslationProvider.types'
import { buildSentenceTranslationPrompt } from './buildSentenceTranslationPrompt'

export type TranslateSentenceInput = {
	userId: null | number
	sentenceId: number
	text: string
	sourceLanguageCode?: null | LanguageCode
	targetLanguageCode: LanguageCode
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
		private translateWithDeepSeek: TranslateWithDeepSeek,
		private translateWithChatGPT: TranslateWithChatGPT,
		private translateWithGemini: TranslateWithGemini,
		private sentenceTranslationRepository: SentenceTranslationRepository,
		private sentenceTranslationAccessService: SentenceTranslationAccessService,
		private userBalanceTransactionRepository: UserBalanceTransactionRepository,
		private mainConfigService: MainConfigService,
		private commandBus: CommandBus,
		@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
	) {}

	async execute(command: TranslateSentenceCommand): Promise<TranslateSentenceResult> {
		let draftSentenceTranslationId: null | number = null

		try {
			const preparedInput = await this.prepareTranslationOrThrow(command.input)

			const draftSentenceTranslation = await this.createDraftSentenceTranslation({
				sentenceId: command.input.sentenceId,
				targetLanguageCode: command.input.targetLanguageCode,
			})
			draftSentenceTranslationId = draftSentenceTranslation.id

			const translationResult = await this.generateSentenceTranslation({
				provider: preparedInput.provider,
				text: command.input.text,
				sourceLanguageCode: preparedInput.sourceLanguageCode,
				targetLanguageCode: command.input.targetLanguageCode,
				lowPriority: preparedInput.lowPriority,
				bookName: command.input.bookName,
				bookAuthor: command.input.bookAuthor,
				videoName: command.input.videoName,
				videoYear: command.input.videoYear,
			})

			const finalizedTranslation = translationResult.fullText.trim()

			if (!finalizedTranslation) {
				await this.deleteDraftSentenceTranslationIfExists(draftSentenceTranslation.id)
				throw new CustomError(errorMessage.unknownOpenAIError, ErrorStatusCode.InternalServerError_500)
			}

			await this.chargeAfterTranslationIfNeeded({
				userId: command.input.userId,
				chargeAfterTranslation: preparedInput.createMode === 'chargeBalance',
				usage: translationResult.usage,
			})

			await this.saveFinalTranslation({
				sentenceTranslationId: draftSentenceTranslation.id,
				translation: finalizedTranslation,
			})

			return {
				translatedText: finalizedTranslation,
			}
		} catch (error) {
			console.log('Error in TranslateSentenceHandler => execute')
			console.error(error)

			if (error instanceof CustomError) {
				if (draftSentenceTranslationId !== null) {
					await this.deleteDraftSentenceTranslationIfExists(draftSentenceTranslationId)
				}

				throw error
			}

			if (draftSentenceTranslationId !== null) {
				await this.deleteDraftSentenceTranslationIfExists(draftSentenceTranslationId)
			}

			this.logger.info('Error while translating sentence', {
				message: error instanceof Error ? error.message : 'Unknown error',
			})

			throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
		}
	}

	private async prepareTranslationOrThrow(input: TranslateSentenceInput): Promise<{
		sourceLanguageCode: LanguageCode
		lowPriority: boolean
		provider: SentenceTranslationProvider
		createMode: SentenceTranslationAccess['createMode']
	}> {
		const access = await this.sentenceTranslationAccessService.resolveAccessOrThrow({
			userId: input.userId,
			sentenceId: input.sentenceId,
		})

		await this.ensureCanCreateNewTranslationOrThrow({
			userId: input.userId,
			access,
		})

		return {
			sourceLanguageCode: input.sourceLanguageCode ?? 'en',
			lowPriority: true,
			provider: this.getTranslationProvider(),
			createMode: access.createMode,
		}
	}

	private getTranslationProvider(): SentenceTranslationProvider {
		const providerName: TranslationProviderName = 'gemini'

		const providers: Record<TranslationProviderName, SentenceTranslationProvider> = {
			deepseek: this.translateWithDeepSeek,
			chatgpt: this.translateWithChatGPT,
			gemini: this.translateWithGemini,
		}

		return providers[providerName]
	}

	private async createDraftSentenceTranslation(input: { sentenceId: number; targetLanguageCode: LanguageCode }) {
		return this.sentenceTranslationRepository.createSentenceTranslation({
			sentenceId: input.sentenceId,
			targetLanguageCode: input.targetLanguageCode,
			translation: '',
		})
	}

	private async generateSentenceTranslation(input: {
		provider: SentenceTranslationProvider
		text: string
		sourceLanguageCode: LanguageCode
		targetLanguageCode: LanguageCode
		lowPriority: boolean
		bookName?: string
		bookAuthor?: string
		videoName?: string
		videoYear?: string | number
	}): Promise<{
		fullText: string
		usage: Parameters<typeof chargeAfterTranslationIfNeeded>[0]['usage']
	}> {
		const result = await input.provider.translate(
			{
				text: input.text,
				sourceLanguageCode: input.sourceLanguageCode,
				targetLanguageCode: input.targetLanguageCode,
				lowPriority: input.lowPriority,
				bookName: input.bookName,
				bookAuthor: input.bookAuthor,
				videoName: input.videoName,
				videoYear: input.videoYear,
			},
			buildSentenceTranslationPrompt,
		)

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
		usage: Parameters<typeof chargeAfterTranslationIfNeeded>[0]['usage']
	}) {
		return chargeAfterTranslationIfNeeded({
			userId: input.userId,
			chargeAfterTranslation: input.chargeAfterTranslation,
			usage: input.usage,
			commandBus: this.commandBus,
		})
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
		access: SentenceTranslationAccess
	}) {
		await ensureModeIsAllowedOrThrow({
			mode: input.access.createMode,
			deniedReason: input.access.createDeniedReason,
			actionType: 'create',
		})

		await ensureCanChargeBalanceOrThrow({
			access: input.access,
			userId: input.userId,
			userBalanceTransactionRepository: this.userBalanceTransactionRepository,
			mainConfigService: this.mainConfigService,
		})
	}
}
