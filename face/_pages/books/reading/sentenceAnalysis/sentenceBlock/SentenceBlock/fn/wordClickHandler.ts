import React from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'

export function useGetWordClickHandler() {
	const addWordInIdlePhraseInSelectedSentence = useReadingStore((s) => s.addWordInIdlePhraseInSelectedSentence)

	return React.useCallback(
		(e: React.MouseEvent, wordId: number) => {
			if (e.ctrlKey || e.metaKey) {
				addWordInIdlePhraseInSelectedSentence(wordId, 'add')
			} else {
				addWordInIdlePhraseInSelectedSentence(wordId, 'replaceAll')
			}
		},
		[addWordInIdlePhraseInSelectedSentence],
	)
}
