import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UniversalPhraseRepository } from 'repo/universalPhrase/universalPhrase.repository'
import { UniversalPhraseTranslationQueryRepository } from 'repo/universalPhrase/universalPhraseTranslation.queryRepository'
import { UniversalPhraseTranslationRepository } from 'repo/universalPhrase/universalPhraseTranslation.repository'
import { AiModel } from 'types/AIModels'
import { GetOrCreateUniversalPhraseCommand } from 'features/universalPhrase/GetOrCreateUniversalPhrase.command'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { UniversalPhraseTranslationOutModel } from 'models/universalPhraseTranslation/universalPhraseTranslation.out.model'
import { LanguageCode } from 'prisma/generated/enums'
import { LLM_TRANSLATION_TIMEOUT_MS } from 'utils/time'
import { buildUniversalPhraseTranslationPrompt } from './buildUniversalPhraseTranslationPrompt'
import { parseUniversalPhraseTranslationResult } from './parseUniversalPhraseTranslationResult'

export type GetOrCreateUniversalPhraseTranslationInput = {
	universalPhraseId?: number
	phraseText?: string
	sourceLanguageCode?: string
	targetLanguageCode: LanguageCode
	/** Если не указана — адаптер использует DeepSeek по умолчанию. */
	model?: AiModel
}

export type GetOrCreateUniversalPhraseTranslationResult = UniversalPhraseTranslationOutModel

export class GetOrCreateUniversalPhraseTranslationCommand implements ICommand {
	constructor(public input: GetOrCreateUniversalPhraseTranslationInput) {}
}

@CommandHandler(GetOrCreateUniversalPhraseTranslationCommand)
export class GetOrCreateUniversalPhraseTranslationHandler implements ICommandHandler<GetOrCreateUniversalPhraseTranslationCommand> {
	constructor(
		private universalPhraseRepository: UniversalPhraseRepository,
		private universalPhraseTranslationRepository: UniversalPhraseTranslationRepository,
		private universalPhraseTranslationQueryRepository: UniversalPhraseTranslationQueryRepository,
		private llmAdapter: LlmAdapterService,
		private commandBus: CommandBus,
	) {}

	async execute(
		command: GetOrCreateUniversalPhraseTranslationCommand,
	): Promise<GetOrCreateUniversalPhraseTranslationResult> {
		const { universalPhraseId, phraseText, sourceLanguageCode, targetLanguageCode, model } = command.input

		// 1. Получаем universalPhraseId (get-or-create если передан текст)
		let resolvedPhraseId: number

		if (universalPhraseId) {
			resolvedPhraseId = universalPhraseId
		} else if (phraseText && sourceLanguageCode) {
			const phrase = await this.commandBus.execute(
				new GetOrCreateUniversalPhraseCommand({
					text: phraseText,
					sourceLanguageCode: sourceLanguageCode as LanguageCode,
				}),
			)

			resolvedPhraseId = phrase.id
		} else {
			throw new CustomError(errorMessage.universalPhrase.notFound, ErrorStatusCode.NotFound_404)
		}

		// 2. Получаем фразу-источник
		const sourcePhrase = await this.universalPhraseRepository.findByIdWithRelations(resolvedPhraseId)
		if (!sourcePhrase) {
			throw new CustomError(errorMessage.universalPhrase.notFound, ErrorStatusCode.NotFound_404)
		}

		// 3. Ищем уже существующий перевод
		const existingTranslation = await this.universalPhraseTranslationRepository.findByPhraseIdAndTargetLang(
			resolvedPhraseId,
			targetLanguageCode,
		)

		if (existingTranslation && existingTranslation.status === 'ready') {
			return (await this.universalPhraseTranslationQueryRepository.getById(existingTranslation.id))!
		}

		// 4. Создаём или находим pending-запись
		let translationId: number

		if (existingTranslation) {
			translationId = existingTranslation.id
		} else {
			const pending = await this.universalPhraseTranslationRepository.createPending({
				universalPhraseId: resolvedPhraseId,
				targetLanguageCode,
			})

			translationId = pending.id
		}

		// 5. Запрашиваем перевод через LLM
		try {
			const systemPrompt = buildUniversalPhraseTranslationPrompt({
				sourceLanguageCode: sourcePhrase.sourceLanguageCode as LanguageCode,
				targetLanguageCode,
				phrase: sourcePhrase.sentenceText,
			})

			const llmResponse = await this.llmAdapter.generate({
				model,
				messages: [
					{ role: 'system', content: systemPrompt },
					{ role: 'user', content: sourcePhrase.sentenceText },
				],
				responseFormat: 'json_object',
				lowPriority: true,
				timeoutMs: LLM_TRANSLATION_TIMEOUT_MS,
			})

			// 6. Парсим результат
			const parsedResult = parseUniversalPhraseTranslationResult(llmResponse.content)

			if (parsedResult.type === 'invalid') {
				throw new CustomError(
					errorMessage.universalPhraseTranslation.cannotParseLLmResponse,
					ErrorStatusCode.InternalServerError_500,
				)
			}

			// 7. Сохраняем результат
			if (parsedResult.type === 'nonExistentWord') {
				await this.universalPhraseTranslationRepository.updateToNonExistentWord(translationId)
			} else {
				await this.universalPhraseTranslationRepository.updateToReady(translationId, parsedResult.data)
			}

			return (await this.universalPhraseTranslationQueryRepository.getById(translationId))!
		} catch (error) {
			const errorCode =
				error instanceof CustomError
					? error.errorMessage.code
					: error instanceof Error
						? error.message
						: errorMessage.unknownError.code

			await this.universalPhraseTranslationRepository.updateToError(translationId, errorCode)

			if (error instanceof CustomError) {
				throw error
			}

			throw new CustomError(
				errorMessage.universalPhraseTranslation.cannotGetTranslationFromLLM,
				ErrorStatusCode.InternalServerError_500,
			)
		}
	}
}
