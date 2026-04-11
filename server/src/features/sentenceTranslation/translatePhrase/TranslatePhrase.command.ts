import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { SentencePhraseTranslationRepository } from 'repo/sentencePhraseTranslation.repository'
import { DeepSeekTokenUsageBalanceChargeCommand } from 'features/payment/DeepSeekTokenUsageBalanceCharge.command'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { CurrentSubscriptionServiceModel } from 'models/auth/auth.service.model'
import { SentencePhraseTranslationServiceModel } from 'models/sentenceTranslation/sentencePhraseTranslation.service.model'
import { LanguageCode } from 'prisma/generated/enums'
import { DailyTranslationLimitService } from '../translate/DailyTranslationLimit.service'
import {
	SentenceTranslationAccess,
	SentenceTranslationAccessService,
} from '../translate/SentenceTranslationAccess.service'
import { parsePhraseTranslationResult } from './parsePhraseTranslationResult'
import { TranslatePhraseWithDeepSeek } from './TranslatePhraseWithDeepSeek.service'

export type TranslatePhraseInput = {
	userId: null | number
	currentSubscription?: null | CurrentSubscriptionServiceModel
	sentenceId: number
	text: string
	selectedWord: string
	selectedWordStartOffset: number
	selectedWordEndOffset: number
	sourceLanguageCode?: null | LanguageCode
	targetLanguageCode?: null | LanguageCode
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
		private dailyTranslationLimitService: DailyTranslationLimitService,
		private sentencePhraseTranslationRepository: SentencePhraseTranslationRepository,
		private translatePhraseWithDeepSeek: TranslatePhraseWithDeepSeek,
		private commandBus: CommandBus,
	) {}

	async execute(command: TranslatePhraseCommand): Promise<TranslatePhraseResult> {
		this.validateSelectedOffsetsOrThrow(command.input)

		const access = await this.sentenceTranslationAccessService.resolveAccessOrThrow({
			userId: command.input.userId,
			currentSubscription: command.input.currentSubscription ?? null,
			sentenceId: command.input.sentenceId,
		})

		await this.ensureModeIsAllowedOrThrow({
			mode: access.createMode,
			deniedReason: access.createDeniedReason,
			actionType: 'create',
		})

		if (access.createMode === 'dailyLimit') {
			await this.consumeDailyLimitOrThrow({
				userId: command.input.userId,
				sentenceId: command.input.sentenceId,
			})
		}

		const pendingPhrase = await this.ensurePendingPhraseRow(command.input)
		if (pendingPhrase.translate) {
			return pendingPhrase
		}

		const sourceLanguageCode = command.input.sourceLanguageCode ?? 'en'
		const targetLanguageCode = command.input.targetLanguageCode ?? 'ru'

		try {
			const generated = await this.translatePhraseWithDeepSeek.translatePhrase({
				text: command.input.text,
				selectedWord: command.input.selectedWord,
				selectedWordStartOffset: command.input.selectedWordStartOffset,
				selectedWordEndOffset: command.input.selectedWordEndOffset,
				sourceLanguageCode,
				targetLanguageCode,
				bookName: command.input.bookName,
				bookAuthor: command.input.bookAuthor,
				videoName: command.input.videoName,
				videoYear: command.input.videoYear,
			})

			const parsed = parsePhraseTranslationResult(generated.message)
			if (!parsed || !parsed.translate) {
				throw new CustomGraphQLError(errorMessage.unknownOpenAIError, ErrorCode.InternalServerError_500)
			}

			const resolvedPhrase = this.resolvePhraseBySentence({
				sentenceText: command.input.text,
				fallbackPhrase: pendingPhrase.phrase,
				fallbackStartOffset: pendingPhrase.phraseStartOffset,
				fallbackEndOffset: pendingPhrase.phraseEndOffset,
				llmPhrase: parsed.phrase,
			})

			let targetPhraseId = pendingPhrase.id

			if (
				resolvedPhrase.phraseStartOffset !== pendingPhrase.phraseStartOffset ||
				resolvedPhrase.phraseEndOffset !== pendingPhrase.phraseEndOffset
			) {
				const existingByNewRange = await this.sentencePhraseTranslationRepository.getPhraseByExactRange({
					sentenceId: command.input.sentenceId,
					phraseStartOffset: resolvedPhrase.phraseStartOffset,
					phraseEndOffset: resolvedPhrase.phraseEndOffset,
				})
				if (existingByNewRange && existingByNewRange.id !== pendingPhrase.id) {
					targetPhraseId = existingByNewRange.id
				}
			}

			const savedPhrase = await this.sentencePhraseTranslationRepository.updatePhraseById(targetPhraseId, {
				phrase: resolvedPhrase.phrase,
				phraseStartOffset: resolvedPhrase.phraseStartOffset,
				phraseEndOffset: resolvedPhrase.phraseEndOffset,
				translate: parsed.translate,
				examples: parsed.examples,
				status: 'ready',
				errorMessage: null,
			})

			if (targetPhraseId !== pendingPhrase.id) {
				await this.sentencePhraseTranslationRepository.deletePhraseById(pendingPhrase.id)
			}

			if (command.input.userId && access.createMode === 'subscriptionBalance') {
				await this.commandBus.execute(
					new DeepSeekTokenUsageBalanceChargeCommand({
						userId: command.input.userId,
						inputTokens: generated.inputTokens,
						outputTokens: generated.outputTokens,
					}),
				)
			}

			return savedPhrase
		} catch (error) {
			const message = error instanceof Error ? error.message : errorMessage.unknownError

			await this.sentencePhraseTranslationRepository.updatePhraseById(pendingPhrase.id, {
				status: 'error',
				errorMessage: message,
			})

			if (error instanceof CustomGraphQLError) {
				throw error
			}

			throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.InternalServerError_500)
		}
	}

	private validateSelectedOffsetsOrThrow(input: TranslatePhraseInput) {
		if (input.selectedWordStartOffset < 0 || input.selectedWordEndOffset <= input.selectedWordStartOffset) {
			throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.BadRequest_400)
		}

		if (input.selectedWordEndOffset > input.text.length) {
			throw new CustomGraphQLError(errorMessage.unknownError, ErrorCode.BadRequest_400)
		}
	}

	private async ensurePendingPhraseRow(input: TranslatePhraseInput): Promise<SentencePhraseTranslationServiceModel> {
		const selectedPhrase = input.text.slice(input.selectedWordStartOffset, input.selectedWordEndOffset).trim()
		const phrase = selectedPhrase || input.selectedWord.trim() || '...'

		const exactRange = await this.sentencePhraseTranslationRepository.getPhraseByExactRange({
			sentenceId: input.sentenceId,
			phraseStartOffset: input.selectedWordStartOffset,
			phraseEndOffset: input.selectedWordEndOffset,
		})
		if (exactRange) {
			return exactRange
		}

		return this.sentencePhraseTranslationRepository.createPendingPhrase({
			sentenceId: input.sentenceId,
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

		const exactStart = input.sentenceText.indexOf(llmPhrase)
		if (exactStart >= 0) {
			return {
				phrase: llmPhrase,
				phraseStartOffset: exactStart,
				phraseEndOffset: exactStart + llmPhrase.length,
			}
		}

		return {
			phrase: input.fallbackPhrase,
			phraseStartOffset: input.fallbackStartOffset,
			phraseEndOffset: input.fallbackEndOffset,
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
