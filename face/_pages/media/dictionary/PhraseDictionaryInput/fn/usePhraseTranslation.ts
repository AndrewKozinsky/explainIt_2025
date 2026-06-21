import { useCallback, useEffect, useRef } from 'react'
import { ApolloError } from '@apollo/client'
import { useLocale } from 'next-intl'
import { getTextByServerErrorMessage } from 'utils/extractErrorText'
import { LanguageCode } from 'utils/languages'
import { useUniversalPhraseTranslation_GetOrCreate } from '@/graphql'
import { usePhraseStore } from '@/stores/phraseStore'
import { errorMessages } from '@/utils/errorMessages'
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

	const [mutateTranslation] = useUniversalPhraseTranslation_GetOrCreate()

	const abortRef = useRef<AbortController | null>(null)

	const fetchTranslation = useCallback(
		async (phraseText: string) => {
			const sourceLang = languageCode
			const targetLang = locale

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
					usePhraseDictionaryStore.getState().setError(errorMessages.unknownServerError)
					return
				}

				if (result.status === 'error' || result.errorMessage) {
					usePhraseDictionaryStore.getState().setError(getTextByServerErrorMessage(result.errorMessage))
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
					usePhraseDictionaryStore.getState().setError(errorMessages.translationWasNotGot)
				}
			} catch (error: unknown) {
				// AbortError — expected when the user quickly switches words
				if (error instanceof DOMException && error.name === 'AbortError') {
					return
				}
				// Apollo wraps AbortError in ApolloError, so check networkError too
				if (error instanceof ApolloError && error.networkError?.name === 'AbortError') {
					return
				}
				usePhraseDictionaryStore.getState().setError(getTextByServerErrorMessage(error))
			}
		},
		[languageCode, locale, mutateTranslation, usePhraseDictionaryStore],
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

			usePhraseDictionaryStore.getState().setInputText(offsets.text)
			usePhraseDictionaryStore.getState().setSourceLanguageCode(languageCode)

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
			const text = usePhraseDictionaryStore.getState().inputText
			if (!text.trim() || !languageCode) return

			abortRef.current?.abort()
			abortRef.current = new AbortController()

			fetchTranslation(text)
		},
		[fetchTranslation, languageCode, usePhraseDictionaryStore],
	)

	return {
		handleSubmit,
	}
}
