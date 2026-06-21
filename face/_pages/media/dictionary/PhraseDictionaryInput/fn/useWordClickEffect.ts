import { useEffect } from 'react'
import { offsetsFromWordIds } from '_pages/media/detailsBlock/DetailsBlock/fn/wordSegmentation'
import { useDetailsStore } from '_pages/media/detailsBlock/detailsStore'
import { usePhraseDictionaryStore } from '../../phraseDictionaryStore'

type UseWordClickEffectParams = {
	/** Функция перевода */
	fetchTranslation: (text: string) => void
	/** Ref к AbortController */
	abortRef: React.MutableRefObject<AbortController | null>
}

/**
 * Следит за `currentWordId` и `currentSentenceText` в detailsStore.
 * При клике на слово автоматически запускает перевод.
 */
export function useWordClickEffect({ fetchTranslation, abortRef }: UseWordClickEffectParams) {
	const languageCode = useDetailsStore((s) => s.languageCode)
	const currentWordId = useDetailsStore((s) => s.currentWordId)
	const currentSentenceText = useDetailsStore((s) => s.currentSentenceText)

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
}
