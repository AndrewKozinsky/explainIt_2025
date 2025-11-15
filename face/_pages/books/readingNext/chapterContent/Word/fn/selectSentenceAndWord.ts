import { useCallback } from 'react'
import { useReadingStoreNext } from '../../../readingStoreNext'

/** Возвращает обработчик нажатия на слово в тексте главы. */
export function useGetOnWordClick() {
	const selectedSentence = useReadingStoreNext((s) => s.selection)
	const changeSelectedSentenceId = useReadingStoreNext((s) => s.changeSelectedSentenceId)
	const isWordsAddingModeEnabled = useReadingStoreNext((s) => s.isWordsAddingModeEnabled)

	return useCallback(
		function (sentenceId: number, wordId: number) {
			if (selectedSentence.sentenceId !== sentenceId) {
				changeSelectedSentenceId(sentenceId)
			}

			const insertType = isWordsAddingModeEnabled ? 'add' : 'replaceAll'
			useReadingStoreNext.getState().addWordToSelectedSentence(wordId, insertType)
		},
		[changeSelectedSentenceId, isWordsAddingModeEnabled, selectedSentence.sentenceId],
	)
}

/** Возвращает обработчик долгого нажатия на слово в тексте главы. */
export function useGetOnWordLongTap() {
	const selectedSentence = useReadingStoreNext((s) => s.selection)
	const deviceType = useReadingStoreNext((s) => s.deviceType)
	const changeSelectedSentenceId = useReadingStoreNext((s) => s.changeSelectedSentenceId)

	return useCallback(
		function (sentenceId: number, wordId: number) {
			if (deviceType !== 'touch') return

			if (selectedSentence.sentenceId !== sentenceId) {
				changeSelectedSentenceId(sentenceId)
			}

			useReadingStoreNext.getState().addWordToSelectedSentence(wordId, 'add')
		},
		[changeSelectedSentenceId, deviceType, selectedSentence.sentenceId],
	)
}
