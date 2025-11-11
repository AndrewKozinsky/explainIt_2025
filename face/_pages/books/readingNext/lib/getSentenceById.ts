import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'

export function getSentenceById(id: number) {
	const populatedChapter = useReadingStoreNext.getState().populatedChapter
	const chapterPart = populatedChapter.parts.find((chapterPart) => chapterPart.id === id)
	if (!chapterPart || chapterPart.type !== 'sentence') return null

	return chapterPart
}
