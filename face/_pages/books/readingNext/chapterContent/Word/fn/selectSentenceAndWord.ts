import { useCallback } from 'react'
import { useReadingStoreNext } from '../../../readingStoreNext'

/** Возвращает обработчик нажатия на слово в тексте главы. */
export function useGetOnWordClick() {
	const selectedSentence = useReadingStoreNext((s) => s.selectedSentence)
	const changeSelectedSentenceId = useReadingStoreNext((s) => s.changeSelectedSentenceId)
	const isWordsAddingModeEnabled = useReadingStoreNext((s) => s.isWordsAddingModeEnabled)

	return useCallback(
		function (sentenceId: number, wordId: number) {
			if (selectedSentence.id !== sentenceId) {
				changeSelectedSentenceId(sentenceId)
			}

			const insertType = isWordsAddingModeEnabled ? 'add' : 'replaceAll'
			useReadingStoreNext.getState().addWordToSelectedSentence(wordId, insertType)
		},
		[changeSelectedSentenceId, isWordsAddingModeEnabled, selectedSentence.id],
	)
}
