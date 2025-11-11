import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useReadingStoreNext } from '_pages/books/readingNext/readingStoreNext'

export function getFullSelectedSentence() {
	const populatedChapter = useReadingStoreNext.getState().populatedChapter
	const sentenceId = useReadingStoreNext.getState().selection.sentenceId

	return populatedChapter.parts.find(
		(chapterPart) => chapterPart.id === sentenceId,
	) as ChapterTextStructurePopulated.Sentence
}
