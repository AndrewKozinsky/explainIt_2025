import { useCallback, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { createMediaIdUrl, pageUrls } from '@/сonsts/pageUrls'
import { useChapterStore } from '_pages/books/chapter/chapterStore'

export function useIsReadButtonDisabled() {
	const chapter = useChapterStore((s) => s.chapter)
	const [isReadButtonDisabled, setIsReadButtonDisabled] = useState(true)

	useEffect(
		function () {
			const chapterContent = chapter.data?.content ? chapter.data.content : ''

			setIsReadButtonDisabled(!chapterContent)
		},
		[chapter],
	)

	return isReadButtonDisabled
}

export function useGetOnReadButtonClick() {
	const book = useChapterStore((s) => s.privateBook.data)
	const chapter = useChapterStore((s) => s.chapter)

	return useCallback(
		function () {
			if (!book) return
			if (!chapter.data) return

			const bookIdInUrl = createMediaIdUrl(book.id, 'private')
			redirect(pageUrls.books.book(bookIdInUrl).chapter(chapter.data.id).reading.path)
		},
		[book, chapter],
	)
}
