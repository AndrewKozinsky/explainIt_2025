import { useReadingStore } from '_pages/books/reading/readingStore'
import { useMemo } from 'react'

export function getSentenceById(id: number) {
	const populatedChapter = useReadingStore.getState().populatedChapter
	const chapterPart = populatedChapter.parts.find((chapterPart) => chapterPart.id === id)
	if (!chapterPart || chapterPart.type !== 'sentence') return null

	return chapterPart
}
