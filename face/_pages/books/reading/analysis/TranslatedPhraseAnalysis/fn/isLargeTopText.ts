import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'

export function useIsLongTopText(phrase: ChapterTextStructurePopulated.SuccessPhrase) {
	return phrase.phrase.length + phrase.analysis.translation.length > 30
}
