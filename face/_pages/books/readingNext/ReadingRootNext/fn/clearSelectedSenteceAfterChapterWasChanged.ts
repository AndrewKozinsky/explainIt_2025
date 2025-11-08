import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useReadingStoreNext } from '../../readingStoreNext'

export function useClearSelectedSentenceAfterChapterWasChanged() {
	const chapterId = useParams().chapterId as string
	const clearSelectedSentence = useReadingStoreNext((s) => s.clearSelectedSentence)

	useEffect(
		function () {
			clearSelectedSentence()
		},
		[chapterId, clearSelectedSentence],
	)
}
