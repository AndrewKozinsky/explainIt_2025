import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { SentencePhraseTranslationRepository } from 'repo/sentencePhraseTranslation.repository'
import { UserBalanceService } from 'features/billing/UserBalance.service'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { SentencePhraseTranslationServiceModel } from 'models/sentenceTranslation/sentencePhraseTranslation.service.model'
import { LanguageCode } from 'prisma/generated/enums'
import { SentenceTranslationAccessService } from '../translateCommon/SentenceTranslationAccess.service'
import { ensureModeIsAllowedOrThrow } from '../translateCommon/TranslationHandler.utils'
import { buildPhraseTranslationPrompt } from './buildPhraseTranslationPrompt'
import { parsePhraseTranslationResult } from './parsePhraseTranslationResult'

export type TranslatePhraseInput = {
	userId: null | number
	sentenceId: number
	text: string
	selectedWord: string
	selectedWordStartOffset: number
	selectedWordEndOffset: number
	sourceLanguageCode?: null | LanguageCode
	targetLanguageCode: LanguageCode
	bookName?: string
	bookAuthor?: string
	videoName?: string
	videoYear?: string | number
}

export type TranslatePhraseResult = SentencePhraseTranslationServiceModel

export class TranslatePhraseCommand implements ICommand {
	constructor(public input: TranslatePhraseInput) {}
}

@CommandHandler(TranslatePhraseCommand)
export class TranslatePhraseHandler implements ICommandHandler<TranslatePhraseCommand> {
	constructor(
		private sentenceTranslationAccessService: SentenceTranslationAccessService,
		private sentencePhraseTranslationRepository: SentencePhraseTranslationRepository,
		private llmAdapter: LlmAdapterService,
		private userBalanceService: UserBalanceService,
	) {}

	async execute(command: TranslatePhraseCommand): Promise<TranslatePhraseResult> {
		this.validateSelectedOffsetsOrThrow(command.input)

		const access = await this.sentenceTranslationAccessService.resolveAccessOrThrow({
			userId: command.input.userId,
			sentenceId: command.input.sentenceId,
		})

		await ensureModeIsAllowedOrThrow({
			mode: access.createMode,
			deniedReason: access.createDeniedReason,
			actionType: 'create',
		})

		// Личная книга или видео: перевод оплачивает владелец. Публичные материалы переводятся бесплатно.
		const userIdToCharge = access.createMode === 'chargeBalance' ? command.input.userId : null
		if (userIdToCharge !== null) {
			await this.userBalanceService.ensurePositiveBalanceOrThrow(userIdToCharge, 'translation')
		}

		const pendingPhrase = await this.ensurePendingPhraseRow(command.input)

		const sourceLanguageCode = command.input.sourceLanguageCode ?? 'en'

		try {
			const generated = await this.generatePhraseTranslation({
				text: command.input.text,
				selectedWord: command.input.selectedWord,
				selectedWordStartOffset: command.input.selectedWordStartOffset,
				selectedWordEndOffset: command.input.selectedWordEndOffset,
				sourceLanguageCode,
				targetLanguageCode: command.input.targetLanguageCode,
				bookName: command.input.bookName,
				bookAuthor: command.input.bookAuthor,
				videoName: command.input.videoName,
				videoYear: command.input.videoYear,
			})

			if (userIdToCharge !== null) {
				await this.userBalanceService.chargeLlm({
					userId: userIdToCharge,
					feature: 'translation',
					model: generated.model,
					usage: generated,
					lowPriority: true,
				})
			}

			const parsed = parsePhraseTranslationResult(generated.content)
			if (!parsed || !parsed.translate) {
				throw new CustomError(errorMessage.unknownOpenAIError, ErrorStatusCode.InternalServerError_500)
			}

			const resolvedPhrase = this.resolvePhraseBySentence({
				sentenceText: command.input.text,
				fallbackPhrase: pendingPhrase.phrase,
				fallbackStartOffset: pendingPhrase.phraseStartOffset,
				fallbackEndOffset: pendingPhrase.phraseEndOffset,
				llmPhrase: parsed.phrase,
			})

			const savedPhrase = await this.sentencePhraseTranslationRepository.updatePhraseById(pendingPhrase.id, {
				phrase: resolvedPhrase.phrase,
				phraseStartOffset: resolvedPhrase.phraseStartOffset,
				phraseEndOffset: resolvedPhrase.phraseEndOffset,
				translate: parsed.translate,
				examples: parsed.examples,
				status: 'ready',
				errorCode: null,
			})

			return savedPhrase
		} catch (error) {
			const errorCode =
				error instanceof CustomError
					? error.errorMessage.code
					: error instanceof Error
						? error.message
						: errorMessage.unknownError.code

			await this.sentencePhraseTranslationRepository.updatePhraseById(pendingPhrase.id, {
				status: 'error',
				errorCode,
			})

			if (error instanceof CustomError) {
				throw error
			}

			throw new CustomError(errorMessage.unknownError, ErrorStatusCode.InternalServerError_500)
		}
	}

	private validateSelectedOffsetsOrThrow(input: TranslatePhraseInput) {
		if (input.selectedWordStartOffset < 0 || input.selectedWordEndOffset <= input.selectedWordStartOffset) {
			throw new CustomError(errorMessage.unknownError, ErrorStatusCode.BadRequest_400)
		}

		if (input.selectedWordEndOffset > input.text.length) {
			throw new CustomError(errorMessage.unknownError, ErrorStatusCode.BadRequest_400)
		}
	}

	private async ensurePendingPhraseRow(input: TranslatePhraseInput): Promise<SentencePhraseTranslationServiceModel> {
		const selectedPhrase = input.text.slice(input.selectedWordStartOffset, input.selectedWordEndOffset).trim()
		const phrase = selectedPhrase || input.selectedWord.trim() || '...'

		return this.sentencePhraseTranslationRepository.createPendingPhrase({
			sentenceId: input.sentenceId,
			targetLanguageCode: input.targetLanguageCode,
			phrase,
			phraseStartOffset: input.selectedWordStartOffset,
			phraseEndOffset: input.selectedWordEndOffset,
		})
	}

	private resolvePhraseBySentence(input: {
		sentenceText: string
		fallbackPhrase: string
		fallbackStartOffset: number
		fallbackEndOffset: number
		llmPhrase: string
	}) {
		const llmPhrase = input.llmPhrase.trim()
		if (!llmPhrase) {
			return {
				phrase: input.fallbackPhrase,
				phraseStartOffset: input.fallbackStartOffset,
				phraseEndOffset: input.fallbackEndOffset,
			}
		}

		// Exact contiguous match
		const exactStart = input.sentenceText.indexOf(llmPhrase)
		if (exactStart >= 0) {
			return {
				phrase: llmPhrase,
				phraseStartOffset: exactStart,
				phraseEndOffset: exactStart + llmPhrase.length,
			}
		}

		// Non-contiguous match: all words of llmPhrase appear in order in the sentence
		const phraseWords = llmPhrase.split(/\s+/)
		if (phraseWords.length > 1) {
			let searchFrom = 0
			let firstWordStart = -1
			let lastWordEnd = -1
			let allFound = true

			for (const word of phraseWords) {
				const pos = input.sentenceText.indexOf(word, searchFrom)
				if (pos < 0) {
					allFound = false
					break
				}
				if (firstWordStart < 0) {
					firstWordStart = pos
				}
				lastWordEnd = pos + word.length
				searchFrom = pos + word.length
			}

			if (allFound && firstWordStart >= 0) {
				return {
					phrase: llmPhrase,
					phraseStartOffset: firstWordStart,
					phraseEndOffset: lastWordEnd,
				}
			}
		}

		return {
			phrase: input.fallbackPhrase,
			phraseStartOffset: input.fallbackStartOffset,
			phraseEndOffset: input.fallbackEndOffset,
		}
	}

	private async generatePhraseTranslation(input: {
		text: string
		selectedWord: string
		selectedWordStartOffset: number
		selectedWordEndOffset: number
		sourceLanguageCode: LanguageCode
		targetLanguageCode: LanguageCode
		bookName?: string
		bookAuthor?: string
		videoName?: string
		videoYear?: string | number
	}) {
		const systemPrompt = buildPhraseTranslationPrompt({
			sourceLanguageCode: input.sourceLanguageCode,
			targetLanguageCode: input.targetLanguageCode,
			sentenceText: input.text,
			selectedWord: input.selectedWord,
			selectedWordStartOffset: input.selectedWordStartOffset,
			selectedWordEndOffset: input.selectedWordEndOffset,
			bookName: input.bookName,
			bookAuthor: input.bookAuthor,
			videoName: input.videoName,
			videoYear: input.videoYear,
		})

		return this.llmAdapter.generate({
			messages: [
				{ role: 'system', content: systemPrompt },
				{ role: 'user', content: input.text },
			],
			lowPriority: true,
		})
	}
}
