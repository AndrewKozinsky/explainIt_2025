import { LanguageCode } from 'utils/languages'
import { UniversalPhrase_GetLazyQueryHookResult, UniversalPhrase_CreateHookResult } from '@/graphql'

export type PhraseData = {
	id: number
	transcription?: { ipa?: string | null } | null
	audioPronunciation?: { audioUrl: string } | null
}

type GetPhraseFn = UniversalPhrase_GetLazyQueryHookResult[0]
type CreatePhraseFn = UniversalPhrase_CreateHookResult[0]

/**
 * Модульный кэш, дедуплицирующий одновременные запросы на создание одной и той же фразы.
 * Если несколько компонентов одновременно запрашивают одну фразу — создаётся только
 * один промис, и все ждут его результат.
 */
const phraseRequestCache = new Map<string, Promise<PhraseData | null>>()

export function resolvePhrase(
	text: string,
	languageCode: LanguageCode,
	getPhrase: GetPhraseFn,
	createPhrase: CreatePhraseFn,
): Promise<PhraseData | null> {
	const key = `${languageCode}:${text}`
	const cached = phraseRequestCache.get(key)
	if (cached) return cached

	const request = (async () => {
		const existing = await fetchPhrase(text, languageCode, getPhrase)
		if (existing) return existing

		return createNewPhrase(text, languageCode, createPhrase)
	})()

	phraseRequestCache.set(key, request)
	// Удаляем неудачные/пустые результаты, чтобы следующий вызов мог повторить попытку.
	// Успешные остаются в кэше для переиспользования при поздних перемонтированиях.
	request.then(
		(data) => {
			if (!data) phraseRequestCache.delete(key)
		},
		() => phraseRequestCache.delete(key),
	)

	return request
}

async function fetchPhrase(
	text: string,
	sourceLanguageCode: LanguageCode,
	getPhrase: GetPhraseFn,
): Promise<PhraseData | null> {
	try {
		const result = await getPhrase({
			variables: { input: { text, sourceLanguageCode } },
			fetchPolicy: 'network-only',
		})

		return result.data?.universal_phrase_get ?? null
	} catch {
		return null
	}
}

async function createNewPhrase(
	text: string,
	sourceLanguageCode: LanguageCode,
	createPhrase: CreatePhraseFn,
): Promise<PhraseData | null> {
	try {
		const result = await createPhrase({
			variables: { input: { text, sourceLanguageCode } },
		})

		return result.data?.universal_phrase_create ?? null
	} catch {
		return null
	}
}
