import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { useBooksStore } from '_pages/books/books/booksStore'
import { pageUrls } from 'сonsts/pageUrls'

export function useGetPageHeader() {
	const params = useParams() as { bookId?: string; chapterId?: string }
	const urlBookId = params.bookId
	const chapterId = params.chapterId

	const publicBook = useBooksStore((s) => s.publicBook)
	const privateBook = useBooksStore((s) => s.privateBook)
	const loadedChapter = useBooksStore((s) => s.chapter.data)

	return useMemo(() => {
		// /books
		if (!urlBookId) {
			return pageUrls.books.name
		}

		// /books/:bookId
		if (!chapterId) {
			return publicBook?.name ?? privateBook?.name ?? pageUrls.books.book(urlBookId).name
		}

		// /books/:bookId/:chapterId
		const chapterIdNum = parseInt(chapterId)

		const chapterFromBook =
			publicBook?.chapters?.find((ch) => ch.id === chapterIdNum) ??
			privateBook?.chapters?.find((ch) => ch.id === chapterIdNum) ??
			null

		return (
			loadedChapter?.header ??
			loadedChapter?.name ??
			chapterFromBook?.header ??
			chapterFromBook?.name ??
			pageUrls.books.book(urlBookId).name
		)
	}, [urlBookId, chapterId, publicBook, privateBook, loadedChapter])
}
