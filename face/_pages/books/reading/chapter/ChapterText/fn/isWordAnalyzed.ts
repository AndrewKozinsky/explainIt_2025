import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'

export function isWordAnalyzed(sentence: ChapterTextStructurePopulated.Sentence, wordId: number) {
	const phraseWithThisWord = sentence.phrases.find((phrase) => {
		return phrase.wordIds.includes(wordId)
	})

	return !!phraseWithThisWord
}
