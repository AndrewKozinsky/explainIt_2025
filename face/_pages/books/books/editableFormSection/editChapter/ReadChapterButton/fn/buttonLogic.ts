import { booksFetcher } from '_pages/books/booksFetcher'
import { useCallback, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { pageUrls } from '@/сonsts/pageUrls'

export function useIsReadButtonDisabled() {
	const [isReadButtonDisabled, setIsReadButtonDisabled] = useState(true)

	const chapter = booksFetcher.useGetCurrentChapter()

	useEffect(
		function () {
			if (!chapter) return

			setIsReadButtonDisabled(!chapter.content)
		},
		[chapter],
	)

	return isReadButtonDisabled
}

export function useGetOnReadButtonClick() {
	const bookId = booksFetcher.useGetCurrentBookIdFromUrl()
	const chapterId = booksFetcher.useGetCurrentChapterIdFromUrl()

	return useCallback(
		function () {
			redirect(pageUrls.books.book(bookId).chapter(chapterId).reading.path)
		},
		[bookId, chapterId],
	)
}
