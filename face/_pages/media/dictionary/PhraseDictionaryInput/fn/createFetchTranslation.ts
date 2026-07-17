import type {
	GetOrCreateUniversalPhraseTranslationInput,
	UniversalPhraseTranslationOutModel,
} from '@/shared/api/generated/models'
import { LanguageCode } from '@/shared/utils/languages'
import { usePhraseStore } from '@/stores/phraseStore'
import { makeCacheKey, usePhraseDictionaryStore } from '../../phraseDictionaryStore'
import { isAbortError } from './isAbortError'

type FetchTranslationDeps = {
	/** Getter — всегда возвращает актуальный sourceLanguageCode */
	getSourceLang: () => string
	/** Getter — всегда возвращает актуальный targetLanguageCode (locale) */
	getTargetLang: () => string
	/** Функция вызова REST-мутации перевода */
	mutateTranslation: (
		input: GetOrCreateUniversalPhraseTranslationInput,
		options?: RequestInit,
	) => Promise<UniversalPhraseTranslationOutModel>
	/** Getter — всегда возвращает актуальный AbortSignal */
	getAbortSignal: () => AbortSignal | undefined
}

/**
 * Создаёт функцию `fetchTranslation`, которая:
 * 1. Проверяет кэш
 * 2. Получает/создаёт UniversalPhrase через resolvePhrase
 * 3. Запрашивает перевод через REST-мутацию
 * 4. Обрабатывает результат: перевод / несуществующее слово / ошибка
 */
export function createFetchTranslation(deps: FetchTranslationDeps) {
	const { getSourceLang, getTargetLang, mutateTranslation, getAbortSignal } = deps

	return async function fetchTranslation(phraseText: string): Promise<void> {
		const sourceLang = getSourceLang()
		const targetLang = getTargetLang()

		if (!sourceLang || !phraseText.trim()) return

		const cacheKey = makeCacheKey(phraseText.trim(), sourceLang, targetLang)

		// Проверяем кэш перевода
		const cached = usePhraseDictionaryStore.getState().getCachedTranslation(cacheKey)
		if (cached) {
			usePhraseDictionaryStore.getState().setTranslationResult(cached, null, null)
			return
		}

		usePhraseDictionaryStore.getState().setStatusLoading()

		try {
			// 1. Получаем или создаём UniversalPhrase (стор сам кэширует и дедуплицирует)
			const phraseResult = await usePhraseStore
				.getState()
				.resolvePhrase(phraseText.trim(), sourceLang as LanguageCode)

			if (!phraseResult.ok) {
				usePhraseDictionaryStore.getState().setError('Не удалось найти или создать фразу.')
				return
			}

			const phraseData = phraseResult.data

			// 2. Запрашиваем перевод по universalPhraseId
			const result = await mutateTranslation(
				{
					universalPhraseId: phraseData.id,
					targetLanguageCode: targetLang,
					provider: 'gemini',
				},
				{
					signal: getAbortSignal(),
				},
			)

			if (!result) {
				usePhraseDictionaryStore.getState().setError('Неизвестная ошибка сервера.')
				return
			}

			if (result.status === 'error' || result.errorMessage) {
				usePhraseDictionaryStore.getState().setError('Не удалось получить перевод.')
				return
			}

			if (result.nonExistentWord) {
				usePhraseDictionaryStore.getState().setNonExistentWord()
				return
			}

			if (result.translation) {
				usePhraseDictionaryStore.getState().setCachedTranslation(cacheKey, result.translation)
				usePhraseDictionaryStore
					.getState()
					.setTranslationResult(
						result.translation,
						result.transcription ?? null,
						phraseData.audioPronunciation?.audioUrl ?? null,
					)
			} else {
				usePhraseDictionaryStore.getState().setError('Перевод не был получен.')
			}
		} catch (error: unknown) {
			if (isAbortError(error)) return
			usePhraseDictionaryStore.getState().setError('Не удалось получить перевод.')
		}
	}
}
