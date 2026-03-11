// import { useCallback, useEffect, useState } from 'react'
// import { redirect } from 'next/navigation'
// import { createBookIdUrl, pageUrls } from '@/сonsts/pageUrls'
// import { useBooksStore } from '_pages/books/books/booksStore'

/*export function useIsReadButtonDisabled() {
	const chapter = useBooksStore((s) => s.chapter)
	const [isReadButtonDisabled, setIsReadButtonDisabled] = useState(true)

	useEffect(
		function () {
			const chapterContent = chapter.data?.content ? chapter.data.content : ''

			setIsReadButtonDisabled(!chapterContent)
		},
		[chapter],
	)

	return isReadButtonDisabled
}*/

/*export function useGetOnReadButtonClick() {
	const book = useBooksStore((s) => s.privateBook)
	const chapter = useBooksStore((s) => s.chapter)

	return useCallback(
		function () {
			if (!book) return
			if (!chapter.data) return

			const bookIdInUrl = createBookIdUrl(book.id, 'private')
			redirect(pageUrls.books.book(bookIdInUrl).chapter(chapter.data.id).reading.path)
		},
		[book, chapter],
	)
}*/
