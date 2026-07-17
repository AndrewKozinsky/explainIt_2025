// import { useMemo } from 'react'
// import type { BookChapterLiteOutModel } from '@/shared/api/generated/models'
// import { useReadingStore } from '../../readingStore'

/*export function useGetPrevAndNextChapters() {
	const book = useReadingStore((s) => s.book.data)
	const currentChapterId = useReadingStore((s) => s.populatedChapter.id)

	return useMemo(
		function (): { prev: null | BookChapterLiteOutModel; next: null | BookChapterLiteOutModel } {
			// During route changes the reading store may temporarily clear chapter.data.
			// Be defensive and return no neighbors until the chapter id is available.
			if (!currentChapterId) {
				return { prev: null, next: null }
			}

			const chapters = book.chapters as unknown as BookChapterLiteOutModel[]
			const currentChapterIdx = chapters.findIndex((chapter) => chapter.id === currentChapterId)
			if (currentChapterIdx === -1) {
				return { prev: null, next: null }
			}

			let prevChapter: null | BookChapterLiteOutModel = null
			let nextChapter: null | BookChapterLiteOutModel = null

			if (chapters[currentChapterIdx - 1]) {
				prevChapter = chapters[currentChapterIdx - 1]
			}

			if (chapters[currentChapterIdx + 1]) {
				nextChapter = chapters[currentChapterIdx + 1]
			}

			return {
				prev: prevChapter,
				next: nextChapter,
			}
		},
		[book, currentChapterId],
	)
}*/
