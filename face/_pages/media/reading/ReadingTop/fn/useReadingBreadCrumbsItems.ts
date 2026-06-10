import React from 'react'
import { useParams } from 'next/navigation'
import { pageUrls } from 'utils/pageUrls'
import { useReadingStore } from '_pages/media/reading/readingStore'

type BreadCrumbItem = {
	name: string
	path: string
}

export function useReadingBreadCrumbsItems(): BreadCrumbItem[] {
	const params = useParams() as { bookId: string; chapterId: string }
	const urlBookId = params.bookId

	const bookName = useReadingStore((s) => s.book?.data?.name ?? undefined)

	return React.useMemo(() => {
		const bookUrl = pageUrls.books.book(urlBookId)

		return [pageUrls.books, { name: bookName ?? bookUrl.name, path: bookUrl.path }]
	}, [urlBookId, bookName])
}
