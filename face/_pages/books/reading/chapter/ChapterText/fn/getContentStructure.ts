import { ChapterTextStructure } from '@/_pages/books/books/editableFormSection/common/chapterStructure/chapterStructureTypes'
import { booksFetcher } from '_pages/books/booksFetcher'

export function useGetContentStructure() {
	const chapterData = booksFetcher.useGetCurrentChapter()
	if (!chapterData) return null

	return chapterData.content ? (JSON.parse(chapterData.content) as ChapterTextStructure.Chapter) : null
}
