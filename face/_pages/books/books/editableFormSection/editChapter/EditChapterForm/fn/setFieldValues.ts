import { useEffect } from 'react'
import { booksFetcher } from '@/_pages/books/booksFetcher'

export function useSetFieldValues(reset: (data: any) => void) {
	const chapter = booksFetcher.useGetCurrentChapter()

	useEffect(() => {
		if (!chapter) return

		reset({
			name: chapter.name ?? '',
			header: chapter.header ?? '',
			content: chapter.content ? booksFetcher.jsonChapterContentStructureToText(chapter.content) : '',
			note: chapter.note ?? '',
		})
	}, [chapter, reset])
}
