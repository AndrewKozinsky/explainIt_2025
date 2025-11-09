import { useCallback } from 'react'
import { useReadingStoreNext } from '../../../readingStoreNext'

/** Возвращает обработчик нажатия на слово в тексте главы. */
export function useGetOnWordClick() {
	const selectedSentenceId = useReadingStoreNext((s) => s.selectedSentenceId)
	const changeSelectedSentenceId = useReadingStoreNext((s) => s.changeSelectedSentenceId)
	const clearIdlePhrasesInAllSentences = useReadingStoreNext((s) => s.clearIdlePhrasesInAllSentences)
	const isWordsAddingModeEnabled = useReadingStoreNext((s) => s.isWordsAddingModeEnabled)

	return useCallback(
		function (sentenceId: number, wordId: number) {
			if (selectedSentenceId !== sentenceId) {
				changeSelectedSentenceId(sentenceId)
				clearIdlePhrasesInAllSentences()
				changeSelectedSentenceId(sentenceId)
			}

			const insertType = isWordsAddingModeEnabled ? 'add' : 'replaceAll'
			useReadingStoreNext.getState().addWordInIdlePhraseInSentence(sentenceId, wordId, insertType)
		},
		[changeSelectedSentenceId, clearIdlePhrasesInAllSentences, isWordsAddingModeEnabled, selectedSentenceId],
	)
}
