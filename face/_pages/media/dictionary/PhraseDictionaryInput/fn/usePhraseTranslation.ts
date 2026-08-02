import { useCallback, useMemo, useRef } from 'react'
import { useLocale } from 'next-intl'
import { useDetailsStore } from '@/entites/detailsBlock/detailsStore'
import { PhraseTranslationApi } from '@/entites/phraseTranslation/repository/PhraseTranslationApi'
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

	const translationRepository = useMemo(() => new PhraseTranslationApi(), [])

	// Функция перевода — создаётся один раз, значения читает через геттеры
	const fetchTranslation = useMemo(
		() =>
			createFetchTranslation({
				getSourceLang: () => useDetailsStore.getState().languageCode ?? '',
				getTargetLang: () => locale,
				translationRepository,
				getAbortSignal: () => abortRef.current?.signal,
			}),
		[locale, translationRepository],
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
