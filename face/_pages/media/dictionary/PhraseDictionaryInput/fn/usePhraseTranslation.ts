import { useCallback, useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'
import { getTextByServerErrorMessage } from 'utils/extractErrorText'
import { LanguageCode } from 'utils/languages'
import {
	useUniversalPhraseTranslation_GetOrCreate,
	useUniversalPhrase_GetLazyQuery,
	useUniversalPhrase_Create,
} from '@/graphql'
import { errorMessages } from '@/utils/errorMessages'
import { resolvePhrase } from '_pages/media/commonComponents/resolveUniversalPhrase'
import { offsetsFromWordIds } from '_pages/media/detailsBlock/DetailsBlock/fn/wordSegmentation'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import { makeCacheKey, usePhraseDictionaryStore } from '../../phraseDictionaryStore'

/**
 * Управляет запросом перевода фразы: resolvePhrase → кэш → API-вызов перевода.
 * Также следит за currentWordId — при клике на слово авто-запрашивает перевод.
 */
export function usePhraseTranslation() {
	const locale = useLocale()
	const languageCode = useDetailsStore((s) => s.languageCode)
	const currentWordId = useDetailsStore((s) => s.currentWordId)
	const currentSentenceText = useDetailsStore((s) => s.currentSentenceText)

	const store = usePhraseDictionaryStore

	const [mutateTranslation] = useUniversalPhraseTranslation_GetOrCreate()
	const [getPhrase] = useUniversalPhrase_GetLazyQuery()
	const [createPhrase] = useUniversalPhrase_Create()

	const abortRef = useRef<AbortController | null>(null)

	const fetchTranslation = useCallback(
		async (phraseText: string) => {
			const sourceLang = languageCode
			const targetLang = locale

			if (!sourceLang || !phraseText.trim()) return

			const cacheKey = makeCacheKey(phraseText.trim(), sourceLang, targetLang)

			// Проверяем кэш перевода
			const cached = store.getState().getCachedTranslation(cacheKey)
			if (cached) {
				store.getState().setTranslationResult(cached, null, null)
				return
			}

			store.getState().setStatusLoading()

			try {
				// 1. Получаем или создаём UniversalPhrase (общий кэш с транскрипцией/озвучкой)
				const phraseData = await resolvePhrase(
					phraseText.trim(),
					sourceLang as LanguageCode,
					getPhrase,
					createPhrase,
				)

				if (!phraseData) {
					store.getState().setError('Не удалось найти или создать фразу.')
					return
				}

				// 2. Запрашиваем перевод по universalPhraseId
				const { data } = await mutateTranslation({
					variables: {
						input: {
							universalPhraseId: phraseData.id,
							targetLanguageCode: targetLang,
							provider: 'gemini',
						},
					},
					context: {
						fetchOptions: {
							signal: abortRef.current?.signal,
						},
					},
				})

				const result = data?.universal_phrase_translation_get_or_create

				if (!result) {
					store.getState().setError(errorMessages.unknownServerError)
					return
				}

				if (result.status === 'error' || result.errorMessage) {
					store.getState().setError(getTextByServerErrorMessage(result.errorMessage))
					return
				}

				if (result.nonExistentWord) {
					store.getState().setNonExistentWord()
					return
				}
				if (result.translation) {
					store.getState().setCachedTranslation(cacheKey, result.translation)
					store
						.getState()
						.setTranslationResult(
							result.translation,
							result.transcription ?? null,
							phraseData.audioPronunciation?.audioUrl ?? null,
						)
				} else {
					store.getState().setError(errorMessages.translationWasNotGot)
				}
			} catch (error: unknown) {
				if (error instanceof DOMException && error.name === 'AbortError') {
					return
				}
				store.getState().setError(getTextByServerErrorMessage(error))
			}
		},
		[languageCode, locale, mutateTranslation, getPhrase, createPhrase, store],
	)

	// Следит за кликом по слову
	useEffect(
		function () {
			if (!currentWordId || !currentSentenceText || !languageCode) return

			const offsets = offsetsFromWordIds({
				sentenceText: currentSentenceText,
				wordIds: [currentWordId],
			})
			if (!offsets || !offsets.text.trim()) return

			store.getState().setInputText(offsets.text)
			store.getState().setSourceLanguageCode(languageCode)

			// Отменяем предыдущий запрос
			abortRef.current?.abort()
			abortRef.current = new AbortController()

			fetchTranslation(offsets.text)
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[currentWordId, currentSentenceText, languageCode],
	)

	// Обработчик ручного ввода (Enter)
	const handleSubmit = useCallback(
		function () {
			const text = store.getState().inputText
			if (!text.trim() || !languageCode) return

			abortRef.current?.abort()
			abortRef.current = new AbortController()

			fetchTranslation(text)
		},
		[fetchTranslation, languageCode, store],
	)

	return {
		handleSubmit,
	}
}
