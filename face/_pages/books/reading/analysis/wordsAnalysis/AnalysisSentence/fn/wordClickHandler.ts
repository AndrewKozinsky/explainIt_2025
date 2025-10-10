import React from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'

export function useGetWordClickHandler() {
	const addOrUpdateIdlePhraseInSelectedSentence = useReadingStore((s) => s.addOrUpdateIdlePhraseInSelectedSentence)

	return React.useCallback(
		(e: React.MouseEvent, wordId: number) => {
			if (e.ctrlKey || e.metaKey) {
				addOrUpdateIdlePhraseInSelectedSentence(wordId, 'add')
			} else {
				addOrUpdateIdlePhraseInSelectedSentence(wordId, 'replace')
			}
		},
		[addOrUpdateIdlePhraseInSelectedSentence],
	)
}
