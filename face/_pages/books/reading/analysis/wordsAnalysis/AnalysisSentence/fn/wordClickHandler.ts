import { useChapterStore } from '_pages/books/reading/chapterStore'
import React from 'react'

export function useGetWordClickHandler() {
	const selectSingleWord = useChapterStore((s) => s.selectSingleWord)
	const addWordToSelection = useChapterStore((s) => s.addWordToSelection)

	return React.useCallback(
		(e: React.MouseEvent, wordId: number) => {
			if (e.ctrlKey || e.metaKey) {
				addWordToSelection(wordId)
			} else {
				selectSingleWord(wordId)
			}
		},
		[addWordToSelection, selectSingleWord],
	)
}
