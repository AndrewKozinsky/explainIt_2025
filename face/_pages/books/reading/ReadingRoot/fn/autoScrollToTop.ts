import { useReadingStore } from '_pages/books/reading/readingStore'
import { useEffect } from 'react'

export function useAutoScrollToTop() {
	const chapter = useReadingStore((s) => s.chapter)

	useEffect(
		function () {
			if (!chapter?.data?.id) return
			window.scrollTo({ top: 0, behavior: 'smooth' })
		},
		[chapter?.data?.id],
	)
}
