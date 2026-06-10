import { useCallback, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { useLocale } from 'next-intl'
import { createMediaIdUrl, pageUrls, localizePath } from '@/utils/pageUrls'
import { useChapterStore } from '_pages/media/chapter/chapterStore'

export function useIsReadButtonDisabled() {
	const chapter = useChapterStore((s) => s.chapter)
	const [isReadButtonDisabled, setIsReadButtonDisabled] = useState(true)

	useEffect(
		function () {
			const chapterContent = chapter.data?.originalContent ? chapter.data.originalContent : ''

			setIsReadButtonDisabled(!chapterContent)
		},
		[chapter],
	)

	return isReadButtonDisabled
}

export function useGetOnReadButtonClick() {
	const book = useChapterStore((s) => s.privateBook.data)
	const chapter = useChapterStore((s) => s.chapter)
	const locale = useLocale()

	return useCallback(
		function () {
			if (!book) return
			if (!chapter.data) return

			const bookIdInUrl = createMediaIdUrl(book.id, 'private')
			redirect(localizePath(locale, pageUrls.books.book(bookIdInUrl).chapter(chapter.data.id).reading.path))
		},
		[book, chapter, locale],
	)
}
