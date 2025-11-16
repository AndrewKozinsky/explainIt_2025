import { useGetSelectedSentence } from '_pages/books/reading/lib/getSelectedSentence'
import { useMemo } from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'

/**
 * Возвращает конфигурацию для отрисовки кнопок с фразами, в которые входят выделенные слова чтобы пользователь быстро выбрал нужную фразу.
 */
export function useGetSelectedPhrasesConfig() {
	const selection = useReadingStore((s) => s.selection)
	const selectedSentence = useGetSelectedSentence()

	return useMemo(
		function () {
			if (!selection.sentenceId || !selection.wordIds.length || !selectedSentence) {
				return
			}

			const phrasesWithThisWords = selectedSentence.phrases.filter((phrase) => {
				return selection.wordIds.every((wordId) => phrase.wordIds.includes(wordId))
			})
			if (phrasesWithThisWords.length <= 1) {
				return
			}

			return phrasesWithThisWords.reduce(
				(acc, phrase) => {
					if (phrase.type !== 'success') {
						return acc
					}

					acc.push({ phraseId: phrase.id, text: phrase.phrase, isSelected: phrase.id === selection.phraseId })
					return acc
				},
				[] as { phraseId: number; text: string; isSelected: boolean }[],
			)
		},
		[selectedSentence, selection.phraseId, selection.sentenceId, selection.wordIds],
	)
}
