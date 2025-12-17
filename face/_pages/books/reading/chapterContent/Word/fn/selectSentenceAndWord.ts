import { useCallback } from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'

/** Возвращает обработчик нажатия на слово в тексте главы. */
export function useGetOnWordClick() {
	const selectedSentence = useReadingStore((s) => s.selection)
	const changeSelectedSentenceId = useReadingStore((s) => s.changeSelectedSentenceId)
	const isWordsAddingModeEnabled = useReadingStore((s) => s.isWordsAddingModeEnabled)

	return useCallback(
		function (sentenceId: number, wordId: number) {
			if (selectedSentence.sentenceId !== sentenceId) {
				changeSelectedSentenceId(sentenceId)
			}

			const insertType = isWordsAddingModeEnabled ? 'add' : 'replaceAll'
			useReadingStore.getState().addWordToSelectedSentence(wordId, insertType)
		},
		[changeSelectedSentenceId, isWordsAddingModeEnabled, selectedSentence.sentenceId],
	)
}

/** Возвращает обработчик долгого нажатия на слово в тексте главы. */
export function useGetOnWordLongTap() {
	const selectedSentence = useReadingStore((s) => s.selection)
	const deviceType = useReadingStore((s) => s.deviceType)
	const changeSelectedSentenceId = useReadingStore((s) => s.changeSelectedSentenceId)

	return useCallback(
		function (sentenceId: number, wordId: number) {
			if (deviceType !== 'touch') {
				alert('not touch')
				return
			}

			if (selectedSentence.sentenceId !== sentenceId) {
				changeSelectedSentenceId(sentenceId)
			}

			useReadingStore.getState().addWordToSelectedSentence(wordId, 'add')
		},
		[changeSelectedSentenceId, deviceType, selectedSentence.sentenceId],
	)
}
