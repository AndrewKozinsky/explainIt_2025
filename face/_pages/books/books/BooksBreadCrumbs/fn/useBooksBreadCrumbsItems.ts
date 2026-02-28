import React from 'react'
import { useParams } from 'next/navigation'
import { useBooksStore } from '_pages/books/books/booksStore'
import { pageUrls } from 'сonsts/pageUrls'

type BreadCrumbItem = {
	name: string
	path: string
}

export function useBooksBreadCrumbsItems(): BreadCrumbItem[] {
	const params = useParams() as { bookId?: string; chapterId?: string }
	const urlBookId = params.bookId
	const chapterId = params.chapterId

	const publicBookName = useBooksStore((s) => s.publicBook?.name ?? undefined)
	const privateBookName = useBooksStore((s) => s.privateBook?.name ?? undefined)

	return React.useMemo(() => {
		// /books
		if (!urlBookId) return []

		// /books/:bookId
		if (!chapterId) return [pageUrls.books]

		// /books/:bookId/:chapterId
		const bookUrl = pageUrls.books.book(urlBookId)
		const bookName = publicBookName ?? privateBookName ?? bookUrl.name

		return [pageUrls.books, { name: bookName, path: bookUrl.path }]
	}, [urlBookId, chapterId, publicBookName, privateBookName])
}
