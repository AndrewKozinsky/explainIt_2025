import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { useReadingStore } from '_pages/books/reading/readingStore'

export function getFullSelectedSentence() {
	const populatedChapter = useReadingStore.getState().populatedChapter
	const sentenceId = useReadingStore.getState().selection.sentenceId

	return populatedChapter.parts.find(
		(chapterPart) => chapterPart.id === sentenceId,
	) as ChapterTextStructurePopulated.Sentence
}
