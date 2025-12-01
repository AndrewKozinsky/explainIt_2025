// import { useBooksStore } from '_pages/books/books/booksStore'
// import { useCallback, useEffect, useState } from 'react'
// import { redirect } from 'next/navigation'
// import { pageUrls } from '@/сonsts/pageUrls'

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
	const book = useBooksStore((s) => s.book)
	const chapter = useBooksStore((s) => s.chapter)

	return useCallback(
		function () {
			if (!book) return
			if (!chapter.data) return

			redirect(pageUrls.books.book(book.id).chapter(chapter.data.id).reading.path)
		},
		[book, chapter],
	)
}*/
