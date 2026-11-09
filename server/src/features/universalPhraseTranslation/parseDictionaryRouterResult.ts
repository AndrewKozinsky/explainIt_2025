import { WORD_KINDS, WordKind } from './dictionaryArticleConfig'
import { parseLlmJson } from './parseUniversalPhraseTranslationResult'

export type DictionaryRoute = { exists: boolean; kind: WordKind; lemmas: string[] }

const MAX_LEMMAS = 5

/** Маршрут при сбое маршрутизатора: статья всё равно пишется, только без подсказки. */
export const FALLBACK_DICTIONARY_ROUTE: DictionaryRoute = { exists: true, kind: 'other', lemmas: [] }

/** Разбирает ответ маршрутизатора. Некорректный ответ не должен мешать написанию статьи. */
export function parseDictionaryRouterResult(rawMessage: string): DictionaryRoute {
	const parsedRoute = parseLlmJson(rawMessage) as null | { exists?: unknown; kind?: unknown; lemmas?: unknown }
	if (!parsedRoute || typeof parsedRoute !== 'object') return FALLBACK_DICTIONARY_ROUTE

	const lemmas = Array.isArray(parsedRoute.lemmas)
		? parsedRoute.lemmas.filter((lemma): lemma is string => typeof lemma === 'string' && lemma.trim().length > 0)
		: []

	return {
		exists: parsedRoute.exists !== false,
		kind: WORD_KINDS.includes(parsedRoute.kind as WordKind) ? (parsedRoute.kind as WordKind) : 'other',
		lemmas: [...new Set(lemmas.map((lemma) => lemma.trim().toLowerCase()))].slice(0, MAX_LEMMAS),
	}
}
