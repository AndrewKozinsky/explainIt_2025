import { useEffect } from 'react'
import { useReadingStore } from '../../../readingStore'

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
