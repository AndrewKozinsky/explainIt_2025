import { useMemo } from 'react'
import { useChapterStore } from '_pages/books/chapter/chapterStore'
import { bookConfig } from '_pages/books/common/bookConfig'

export function useGetHeader() {
	const chapter = useChapterStore((s) => s.chapter)

	return useMemo(
		function () {
			if (!chapter.data) {
				return null
			}

			if (chapter.data) {
				return chapter.data.name
			}

			return bookConfig.emptyChapterName
		},
		[chapter],
	)
}
