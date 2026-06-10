import { Inject } from '@nestjs/common'
import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { SentenceRepository } from 'repo/sentence.repository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { OpenAIModels } from 'types/openAIModels'
import {
	SentenceTranslationAccess,
	SentenceTranslationAccessService,
} from 'features/translation/translateCommon/SentenceTranslationAccess.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { LanguageCode } from 'prisma/generated/enums'
import {
	chargeAfterTranslationIfNeeded,
	ensureCanChargeBalanceOrThrow,
	ensureModeIsAllowedOrThrow,
} from '../translateCommon/TranslationHandler.utils'
import { TranslationProviderName } from '../translateCommon/TranslationProvider.types'
import { buildSentenceTranslationPrompt } from './buildSentenceTranslationPrompt'

export type TranslateSentenceInput = {
	userId: null | number
	sentenceId: number
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
		private llmAdapter: LlmAdapterService,
		private sentenceRepository: SentenceRepository,
		private sentenceTranslationRepository: SentenceTranslationRepository,
		private sentenceTranslationAccessService: SentenceTranslationAccessService,
		private userBalanceTransactionRepository: UserBalanceTransactionRepository,
		private mainConfigService: MainConfigService,
		private commandBus: CommandBus,
		@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
	) {}

	async execute(command: TranslateSentenceCommand): Promise<TranslateSentenceResult> {
		// Return existing translation if it already exists, avoiding an unnecessary LLM call.
		const existingTranslation =
			await this.sentenceTranslationRepository.getSentenceTranslationBySentenceIdAndTargetLanguageCode({
				sentenceId: command.input.sentenceId,
				targetLanguageCode: command.input.targetLanguageCode,
			})
		if (existingTranslation && existingTranslation.translation) {
			return { translatedText: existingTranslation.translation }
		}

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
				text: preparedInput.text,
				contextText: preparedInput.contextText,
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

			if (draftSentenceTranslationId !== null) {
				await this.deleteDraftSentenceTranslationIfExists(draftSentenceTranslationId)
			}

			if (error instanceof CustomError) {
				throw error
			}

			this.logger.info('Error while translating sentence', {
				message: error instanceof Error ? error.message : 'Unknown error',
			})

			throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
		}
	}

	private async prepareTranslationOrThrow(input: TranslateSentenceInput): Promise<{
		text: string
		contextText: string
		sourceLanguageCode: LanguageCode
		lowPriority: boolean
		provider: TranslationProviderName
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

		const text = await this.getSentenceTextOrThrow(input.sentenceId)
		const contextText = await this.getSentenceContextTextOrThrow(input.sentenceId)

		return {
			text,
			contextText,
			sourceLanguageCode: input.sourceLanguageCode ?? 'en',
			lowPriority: true,
			provider: this.getProviderName(),
			createMode: access.createMode,
		}
	}

	private getProviderName(): TranslationProviderName {
		return 'gemini'
	}

	private async createDraftSentenceTranslation(input: { sentenceId: number; targetLanguageCode: LanguageCode }) {
		return this.sentenceTranslationRepository.createSentenceTranslation({
			sentenceId: input.sentenceId,
			targetLanguageCode: input.targetLanguageCode,
			translation: '',
		})
	}

	private async getSentenceTextOrThrow(sentenceId: number): Promise<string> {
		const sentence = await this.sentenceRepository.getSentenceDbById(sentenceId)

		if (!sentence) {
			throw new CustomError(errorMessage.sentence.notFound, ErrorStatusCode.NotFound_404)
		}

		const content =
			sentence.bookChapter?.processed_content ??
			sentence.videoPrivate?.processed_content ??
			sentence.videoPublic?.processed_content

		if (!content) {
			throw new CustomError(errorMessage.sentence.notFound, ErrorStatusCode.NotFound_404)
		}

		return content.slice(sentence.start_offset, sentence.start_offset + sentence.length)
	}

	private async getSentenceContextTextOrThrow(sentenceId: number): Promise<string> {
		const sentence = await this.sentenceRepository.getSentenceDbById(sentenceId)

		if (!sentence) {
			throw new CustomError(errorMessage.sentence.notFound, ErrorStatusCode.NotFound_404)
		}

		const content =
			sentence.bookChapter?.processed_content ??
			sentence.videoPrivate?.processed_content ??
			sentence.videoPublic?.processed_content

		if (!content) {
			throw new CustomError(errorMessage.sentence.notFound, ErrorStatusCode.NotFound_404)
		}

		const neighborSentences = await this.sentenceRepository.getNeighborSentences({
			sentenceId,
			orderIndex: sentence.order_index,
			bookChapterId: sentence.book_chapter_id,
			videoPrivateId: sentence.video_private_id,
			videoPublicId: sentence.video_public_id,
			beforeSentences: 4,
			afterSentences: 0,
		})

		return [
			...neighborSentences.map((neighbor) =>
				content.slice(neighbor.start_offset, neighbor.start_offset + neighbor.length),
			),
			content.slice(sentence.start_offset, sentence.start_offset + sentence.length),
		].join('\n')
	}

	private async generateSentenceTranslation(input: {
		provider: TranslationProviderName
		text: string
		contextText: string
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
		const systemPrompt = buildSentenceTranslationPrompt({
			sourceLanguageCode: input.sourceLanguageCode,
			targetLanguageCode: input.targetLanguageCode,
			contextText: input.contextText,
			bookName: input.bookName,
			bookAuthor: input.bookAuthor,
			videoName: input.videoName,
			videoYear: input.videoYear,
		})

		const result = await this.llmAdapter.generate({
			provider: input.provider,
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: input.text },
			],
			lowPriority: input.lowPriority,
		})

		return {
			fullText: result.content,
			usage: this.buildUsage(input.provider, result.inputTokens, result.outputTokens, input.lowPriority),
		}
	}

	private buildUsage(
		provider: TranslationProviderName,
		inputTokens: number,
		outputTokens: number,
		lowPriority: boolean,
	): Parameters<typeof chargeAfterTranslationIfNeeded>[0]['usage'] {
		if (provider === 'chatgpt') {
			return {
				provider: 'chatgpt',
				inputTokens,
				outputTokens,
				model: OpenAIModels.Standard,
				lowPriority,
			}
		}

		return { provider, inputTokens, outputTokens }
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
