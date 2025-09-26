import { BookChapterOutModel } from 'graphql'
import { useCallback, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { pageUrls } from '@/сonsts/pageUrls'

import { booksFetcher } from '_pages/books/commonLogic/booksFetcher'

export function useIsReadButtonDisabled(chapter: BookChapterOutModel) {
	const [isReadButtonDisabled, setIsReadButtonDisabled] = useState(true)

	useEffect(
		function () {
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
