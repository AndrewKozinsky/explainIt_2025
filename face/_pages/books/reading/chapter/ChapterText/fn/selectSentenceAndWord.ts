import { useReadingStore } from '_pages/books/reading/readingStore'
import { useCallback } from 'react'
// import { booksHelper } from '_pages/books/booksHelper'
// import { ChapterTextStructureFull } from '@/_pages/books/chapterStructureTypes'

export function useGetSelectSentenceAndWord() {
	const chapter = useReadingStore((s) => s.chapter)

	return useCallback(
		function (sentenceId: number, wordId: number) {
			if (!chapter) return

			useReadingStore.getState().updateSentence({ sentenceId, selectedWordIds: [wordId] })
		},
		[chapter],
	)
}
