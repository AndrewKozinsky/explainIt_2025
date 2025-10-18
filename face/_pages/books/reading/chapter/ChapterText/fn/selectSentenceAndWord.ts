import { useCallback } from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { buildContext } from './buildContext'

/** Возвращает обработчик нажатия на слово в тексте главы. */
export function useGetSelectSentenceAndWord() {
	const populatedChapter = useReadingStore((s) => s.populatedChapter)

	return useCallback(
		function (sentenceId: number, wordId: number) {
			const context = buildContext(populatedChapter, sentenceId, 28)

			useReadingStore.getState().updateSentence(context, sentenceId)
		},
		[populatedChapter],
	)
}
