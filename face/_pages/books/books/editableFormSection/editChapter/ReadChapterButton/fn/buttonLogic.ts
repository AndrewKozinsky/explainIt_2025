import { useCallback, useContext, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { pageUrls } from '../../../../../../../сonsts/pageUrls'
import { booksLogic } from '../../../../booksLogic'

export function useIsReadButtonDisabled() {
	const [isReadButtonDisabled, setIsReadButtonDisabled] = useState(true)

	const chapter = booksLogic.useGetCurrentChapter()

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
	const bookId = booksLogic.useGetCurrentBookIdFromUrl()
	const chapterId = booksLogic.useGetCurrentChapterIdFromUrl()

	return useCallback(
		function () {
			redirect(pageUrls.books.book(bookId).chapter(chapterId).reading.path)
		},
		[bookId, chapterId],
	)
}
