import { Logger } from '@nestjs/common'
import { CommandBus, CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { UniversalPhraseRepository } from 'repo/universalPhrase/universalPhrase.repository'
import { UniversalPhraseTranslationQueryRepository } from 'repo/universalPhrase/universalPhraseTranslation.queryRepository'
import { UniversalPhraseTranslationRepository } from 'repo/universalPhrase/universalPhraseTranslation.repository'
import { WordSenseRepository } from 'repo/universalPhrase/wordSense.repository'
import { GetOrCreateUniversalPhraseCommand } from 'features/universalPhrase/GetOrCreateUniversalPhrase.command'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { DictionaryEnrichmentQueue } from 'infrastructure/queues/dictionaryEnrichment.queue'
import { UniversalPhraseTranslationOutModel } from 'models/universalPhraseTranslation/universalPhraseTranslation.out.model'
import { TranslationBlock } from 'models/universalPhraseTranslation/universalPhraseTranslation.service.model'
import { WordSenseServiceModel } from 'models/universalPhraseTranslation/wordSense.service.model'
import { LanguageCode } from 'prisma/generated/enums'
import { buildDictionaryRouterPrompt } from './buildDictionaryRouterPrompt'
import { buildUniversalPhraseTranslationPrompt } from './buildUniversalPhraseTranslationPrompt'
import {
	DICTIONARY_ROUTER_MODEL,
	DICTIONARY_ROUTER_TIMEOUT_MS,
	DICTIONARY_WRITER_MODEL,
	DICTIONARY_WRITER_TIMEOUT_MS,
	WORD_KINDS_WITHOUT_DEEP_SECTIONS,
} from './dictionaryArticleConfig'
import { DictionaryRoute, FALLBACK_DICTIONARY_ROUTE, parseDictionaryRouterResult } from './parseDictionaryRouterResult'
import {
	DraftBlock,
	DraftSenseBlock,
	parseUniversalPhraseTranslationResult,
} from './parseUniversalPhraseTranslationResult'

export type GetOrCreateUniversalPhraseTranslationInput = {
	universalPhraseId?: number
	phraseText?: string
	sourceLanguageCode?: string
	targetLanguageCode: LanguageCode
}

export type GetOrCreateUniversalPhraseTranslationResult = UniversalPhraseTranslationOutModel

export class GetOrCreateUniversalPhraseTranslationCommand implements ICommand {
	constructor(public input: GetOrCreateUniversalPhraseTranslationInput) {}
}

type ArticleSubject = {
	phrase: string
	sourceLanguageCode: LanguageCode
	targetLanguageCode: LanguageCode
}

type SenseContext = {
	sourceLanguageCode: LanguageCode
	fallbackLemma: string
	knownSenses: Map<number, WordSenseServiceModel>
	/** Значения, для которых надо заказать иллюстрацию. */
	wordSenseIdsAwaitingImage: Set<number>
}

@CommandHandler(GetOrCreateUniversalPhraseTranslationCommand)
export class GetOrCreateUniversalPhraseTranslationHandler implements ICommandHandler<GetOrCreateUniversalPhraseTranslationCommand> {
	private readonly logger = new Logger(GetOrCreateUniversalPhraseTranslationHandler.name)

	constructor(
		private universalPhraseRepository: UniversalPhraseRepository,
		private universalPhraseTranslationRepository: UniversalPhraseTranslationRepository,
		private universalPhraseTranslationQueryRepository: UniversalPhraseTranslationQueryRepository,
		private wordSenseRepository: WordSenseRepository,
		private llmAdapter: LlmAdapterService,
		private commandBus: CommandBus,
		private dictionaryEnrichmentQueue: DictionaryEnrichmentQueue,
	) {}

	async execute(
		command: GetOrCreateUniversalPhraseTranslationCommand,
	): Promise<GetOrCreateUniversalPhraseTranslationResult> {
		const { universalPhraseId, phraseText, sourceLanguageCode, targetLanguageCode } = command.input

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

		// 5. Генерируем статью
		try {
			await this.generateArticle(translationId, {
				phrase: sourcePhrase.sentenceText,
				sourceLanguageCode: sourcePhrase.sourceLanguageCode as LanguageCode,
				targetLanguageCode,
			})

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

	private async generateArticle(translationId: number, subject: ArticleSubject): Promise<void> {
		const route = await this.routePhrase(subject)

		if (!route.exists) {
			await this.universalPhraseTranslationRepository.updateToNonExistentWord(translationId)
			return
		}

		const knownSenses =
			route.lemmas.length > 0
				? await this.wordSenseRepository.findByLemmas(subject.sourceLanguageCode, route.lemmas)
				: []

		const llmResponse = await this.llmAdapter.generate({
			model: DICTIONARY_WRITER_MODEL,
			messages: [
				{
					role: 'system',
					content: buildUniversalPhraseTranslationPrompt({
						...subject,
						kind: route.kind,
						lemmas: route.lemmas,
						knownSenses: knownSenses.map((knownSense) => ({
							id: knownSense.id,
							lemma: knownSense.lemma,
							gloss: knownSense.gloss,
							picture: knownSense.visualPrompt,
						})),
					}),
				},
				{ role: 'user', content: subject.phrase },
			],
			responseFormat: 'json_object',
			reasoningEffort: 'low',
			timeoutMs: DICTIONARY_WRITER_TIMEOUT_MS,
		})

		const parsedResult = parseUniversalPhraseTranslationResult(llmResponse.content)

		if (parsedResult.type === 'invalid') {
			throw new CustomError(
				errorMessage.universalPhraseTranslation.cannotParseLLmResponse,
				ErrorStatusCode.InternalServerError_500,
			)
		}

		if (parsedResult.type === 'nonExistentWord') {
			await this.universalPhraseTranslationRepository.updateToNonExistentWord(translationId)
			return
		}

		const senseContext: SenseContext = {
			sourceLanguageCode: subject.sourceLanguageCode,
			fallbackLemma: route.lemmas[0] ?? subject.phrase,
			knownSenses: new Map(knownSenses.map((knownSense) => [knownSense.id, knownSense])),
			wordSenseIdsAwaitingImage: new Set(),
		}
		const articleBlocks = await this.resolveWordSenses(parsedResult.data, senseContext)

		await this.universalPhraseTranslationRepository.updateToReady(translationId, articleBlocks, route.lemmas)

		// Статья уже сохранена и отдаётся клиенту; сбой очереди не должен её ронять и задерживать.
		void this.enqueueEnrichment(translationId, route, senseContext.wordSenseIdsAwaitingImage).catch(
			(enqueueError: unknown) => {
				this.logger.error(
					`Dictionary enrichment was not enqueued for translation ${translationId}`,
					enqueueError,
				)
			},
		)
	}

	/** Сбой маршрутизатора не мешает статье: писатель работает без подсказки. */
	private async routePhrase(subject: ArticleSubject): Promise<DictionaryRoute> {
		try {
			const routerResponse = await this.llmAdapter.generate({
				model: DICTIONARY_ROUTER_MODEL,
				messages: [
					{ role: 'system', content: buildDictionaryRouterPrompt(subject.sourceLanguageCode) },
					{ role: 'user', content: subject.phrase },
				],
				responseFormat: 'json_object',
				timeoutMs: DICTIONARY_ROUTER_TIMEOUT_MS,
			})

			return parseDictionaryRouterResult(routerResponse.content)
		} catch (routerError) {
			this.logger.warn(`Dictionary router failed for "${subject.phrase}"`, routerError)
			return FALLBACK_DICTIONARY_ROUTE
		}
	}

	/** Заменяет черновые значения блоками со ссылкой на общую запись WordSense. */
	private async resolveWordSenses(draftBlocks: DraftBlock[], context: SenseContext): Promise<TranslationBlock[]> {
		const resolvedBlocks: TranslationBlock[] = []

		for (const draftBlock of draftBlocks) {
			if (draftBlock.type === 'sense') {
				resolvedBlocks.push(await this.resolveSense(draftBlock, context))
			} else if (draftBlock.type === 'block') {
				resolvedBlocks.push({
					...draftBlock,
					children: await this.resolveWordSenses(draftBlock.children, context),
				})
			} else {
				resolvedBlocks.push(draftBlock)
			}
		}

		return resolvedBlocks
	}

	private async resolveSense(draftSense: DraftSenseBlock, context: SenseContext): Promise<TranslationBlock> {
		const children = await this.resolveWordSenses(draftSense.children, context)

		return {
			type: 'sense',
			header: draftSense.header,
			wordSenseId: await this.findOrCreateWordSenseId(draftSense, context),
			children,
		}
	}

	private async findOrCreateWordSenseId(draftSense: DraftSenseBlock, context: SenseContext): Promise<null | number> {
		if (draftSense.senseRef !== null && context.knownSenses.has(draftSense.senseRef)) return draftSense.senseRef
		if (!draftSense.gloss) return null

		const wordSense = await this.wordSenseRepository.findOrCreate({
			sourceLanguageCode: context.sourceLanguageCode,
			lemma: draftSense.lemma ?? context.fallbackLemma,
			gloss: draftSense.gloss,
			visual: draftSense.visual,
		})

		if (wordSense.imageStatus === 'pending') context.wordSenseIdsAwaitingImage.add(wordSense.id)

		return wordSense.id
	}

	private async enqueueEnrichment(
		translationId: number,
		route: DictionaryRoute,
		wordSenseIdsAwaitingImage: Set<number>,
	): Promise<void> {
		if (!WORD_KINDS_WITHOUT_DEEP_SECTIONS.includes(route.kind)) {
			await this.dictionaryEnrichmentQueue.enqueueDeepSections(translationId)
		}

		for (const wordSenseId of wordSenseIdsAwaitingImage) {
			await this.dictionaryEnrichmentQueue.enqueueWordSenseImage(wordSenseId)
		}
	}
}
