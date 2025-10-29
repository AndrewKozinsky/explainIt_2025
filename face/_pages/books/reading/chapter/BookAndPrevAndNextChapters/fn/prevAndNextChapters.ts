import { BookChapterLiteOutModel } from '@/graphql'
import { useMemo } from 'react'
import { useReadingStore } from '_pages/books/reading/readingStore'

export function useGetPrevAndNextChapters() {
	const book = useReadingStore((s) => s.book.data)
	// const currentChapterId = useReadingStore((s) => s.chapter?.data?.id)
	const currentChapterId = useReadingStore((s) => s.populatedChapter?.id)

	return useMemo(
		function (): { prev: null | BookChapterLiteOutModel; next: null | BookChapterLiteOutModel } {
			// During route changes the reading store may temporarily clear chapter.data.
			// Be defensive and return no neighbors until the chapter id is available.
			if (!currentChapterId) {
				return { prev: null, next: null }
			}
			const currentChapterIdx = book.chapters.findIndex((chapter) => chapter.id === currentChapterId)
			if (currentChapterIdx === -1) {
				return { prev: null, next: null }
			}

			let prevChapter: null | BookChapterLiteOutModel = null
			let nextChapter: null | BookChapterLiteOutModel = null

			if (book.chapters[currentChapterIdx - 1]) {
				prevChapter = book.chapters[currentChapterIdx - 1]
			}

			if (book.chapters[currentChapterIdx + 1]) {
				nextChapter = book.chapters[currentChapterIdx + 1]
			}

			return {
				prev: prevChapter,
				next: nextChapter,
			}
		},
		[book, currentChapterId],
	)
}
