import { useCallback, useMemo, useRef } from 'react'
import { useLocale } from 'next-intl'
import { universalPhraseTranslationControllerGetOrCreateTranslation } from '@/shared/api/generated/universal-phrase-translation/universal-phrase-translation'
import type { GetOrCreateUniversalPhraseTranslationInput, UniversalPhraseTranslationOutModel } from '@/shared/api/generated/models'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import { usePhraseDictionaryStore } from '../../phraseDictionaryStore'
import { createFetchTranslation } from './createFetchTranslation'
import { useRetryEffect } from './useRetryEffect'
import { useWordClickEffect } from './useWordClickEffect'

/**
 * Управляет запросом перевода фразы: resolvePhrase → кэш → API-вызов перевода.
 * Также следит за:
 * - currentWordId — при клике на слово авто-запрашивает перевод
 * - retryTrigger — кнопка «Повторить» в PhraseDictionaryError
 */
export function usePhraseTranslation() {
	const locale = useLocale()
	const languageCode = useDetailsStore((s) => s.languageCode)

	const abortRef = useRef<AbortController | null>(null)

	const mutateTranslation = useCallback(
		async (input: GetOrCreateUniversalPhraseTranslationInput, options?: RequestInit) => {
			const response = await universalPhraseTranslationControllerGetOrCreateTranslation(input, options)
			return response as unknown as UniversalPhraseTranslationOutModel
		},
		[],
	)

	// Функция перевода — создаётся один раз, значения читает через геттеры
	const fetchTranslation = useMemo(
		() =>
			createFetchTranslation({
				getSourceLang: () => useDetailsStore.getState().languageCode ?? '',
				getTargetLang: () => locale,
				mutateTranslation,
				getAbortSignal: () => abortRef.current?.signal,
			}),
		[locale, mutateTranslation],
	)

	// Эффекты
	useRetryEffect({ fetchTranslation, languageCode, abortRef })
	useWordClickEffect({ fetchTranslation, abortRef })

	// Ручной ввод (Enter)
	const handleSubmit = useCallback(
		function () {
			const text = usePhraseDictionaryStore.getState().inputText
			if (!text.trim() || !languageCode) return

			abortRef.current?.abort()
			abortRef.current = new AbortController()

			fetchTranslation(text)
		},
		[fetchTranslation, languageCode],
	)

	return { handleSubmit }
}
