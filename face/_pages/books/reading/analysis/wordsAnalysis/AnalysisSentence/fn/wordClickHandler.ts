// import React from 'react'
// import { useReadingStore } from '_pages/books/reading/readingStore'

/*export function useGetWordClickHandler() {
	const selectSingleWord = useReadingStore((s) => s.selectSingleWord)
	const addWordToSelection = useReadingStore((s) => s.addWordToSelection)

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
}*/
