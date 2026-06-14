import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UniversalPhraseRepository } from 'repo/universalPhrase.repository'
import { UniversalPhraseTranslationRepository } from 'repo/universalPhraseTranslation.repository'
import { TranslationProviderName } from 'features/translation/translateCommon/TranslationProvider.types'
import { GetOrCreateUniversalPhraseCommand } from 'features/universalPhrase/GetOrCreateUniversalPhrase.command'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage, serializeErrorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { UniversalPhraseTranslationServiceModel } from 'models/universalPhraseTranslation/universalPhraseTranslation.service.model'
import { LanguageCode } from 'prisma/generated/enums'
import { buildUniversalPhraseTranslationPrompt } from './buildUniversalPhraseTranslationPrompt'
import { parseUniversalPhraseTranslationResult } from './parseUniversalPhraseTranslationResult'

export type GetOrCreateUniversalPhraseTranslationInput = {
	universalPhraseId?: number
	phraseText?: string
	sourceLanguageCode?: string
	targetLanguageCode: LanguageCode
	provider: TranslationProviderName
}

export type GetOrCreateUniversalPhraseTranslationResult = UniversalPhraseTranslationServiceModel

export class GetOrCreateUniversalPhraseTranslationCommand implements ICommand {
	constructor(public input: GetOrCreateUniversalPhraseTranslationInput) {}
}

@CommandHandler(GetOrCreateUniversalPhraseTranslationCommand)
export class GetOrCreateUniversalPhraseTranslationHandler implements ICommandHandler<GetOrCreateUniversalPhraseTranslationCommand> {
	constructor(
		private universalPhraseRepository: UniversalPhraseRepository,
		private universalPhraseTranslationRepository: UniversalPhraseTranslationRepository,
		private llmAdapter: LlmAdapterService,
		private commandBus: CommandBus,
	) {}

	async execute(
		command: GetOrCreateUniversalPhraseTranslationCommand,
	): Promise<GetOrCreateUniversalPhraseTranslationResult> {
		const { universalPhraseId, phraseText, sourceLanguageCode, targetLanguageCode, provider } = command.input

		// 2. Получаем universalPhraseId (get-or-create если передан текст)
		let resolvedPhraseId: number

		if (universalPhraseId) {
			const sourcePhrase = await this.universalPhraseRepository.findByIdWithRelations(universalPhraseId)
			if (!sourcePhrase) {
				throw new CustomError(errorMessage.universalPhrase.notFound, ErrorStatusCode.NotFound_404)
			}

			resolvedPhraseId = sourcePhrase.id
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

		// 1. Ищем уже существующий перевод
		const existingTranslation = await this.universalPhraseTranslationRepository.findByPhraseIdAndTargetLang(
			resolvedPhraseId,
			targetLanguageCode,
		)

		if (existingTranslation && existingTranslation.status === 'ready') {
			return existingTranslation
		}

		// Получаем фразу-источник для промпта
		const sourcePhrase = await this.universalPhraseRepository.findByIdWithRelations(resolvedPhraseId)
		if (!sourcePhrase) {
			throw new CustomError(errorMessage.universalPhrase.notFound, ErrorStatusCode.NotFound_404)
		}

		// 3. Создаём или находим pending-запись
		let pendingTranslation: UniversalPhraseTranslationServiceModel

		if (existingTranslation) {
			pendingTranslation = existingTranslation
		} else {
			pendingTranslation = await this.universalPhraseTranslationRepository.createPending({
				universalPhraseId: resolvedPhraseId,
				targetLanguageCode,
			})
		}

		// 4. Запрашиваем перевод через LLM
		try {
			const systemPrompt = buildUniversalPhraseTranslationPrompt({
				sourceLanguageCode: sourcePhrase.sourceLanguageCode as LanguageCode,
				targetLanguageCode,
				phrase: sourcePhrase.sentenceText,
			})

			const llmResponse = await this.llmAdapter.generate({
				provider,
				messages: [
					{ role: 'system', content: systemPrompt },
					{ role: 'user', content: sourcePhrase.sentenceText },
				],
				responseFormat: 'json_object',
				lowPriority: true,
			})

			// 5. Парсим результат
			const parsedResult = parseUniversalPhraseTranslationResult(llmResponse.content)

			if (parsedResult.type === 'invalid') {
				throw new CustomError(
					errorMessage.universalPhraseTranslation.cannotParseLLmResponse,
					ErrorStatusCode.InternalServerError_500,
				)
			}

			// 6. Сохраняем результат
			if (parsedResult.type === 'nonExistentWord') {
				const savedTranslation = await this.universalPhraseTranslationRepository.updateToNonExistentWord(
					pendingTranslation.id,
				)

				return savedTranslation
			}

			const savedTranslation = await this.universalPhraseTranslationRepository.updateToReady(
				pendingTranslation.id,
				parsedResult.data,
			)

			return savedTranslation
		} catch (error) {
			const errorMessageText =
				error instanceof Error ? error.message : serializeErrorMessage(errorMessage.unknownError)

			await this.universalPhraseTranslationRepository.updateToError(pendingTranslation.id, errorMessageText)

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
