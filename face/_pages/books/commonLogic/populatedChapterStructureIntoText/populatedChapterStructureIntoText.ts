import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'

export function populatedChapterStructureIntoText(chapterSentences: ChapterTextStructurePopulated.Sentence[]): string {
	let result = ''

	for (const item of chapterSentences) {
		const sentence = item as ChapterTextStructurePopulated.Sentence

		for (const part of sentence.parts) {
			if (part.type === 'word') {
				result += part.value
			} else if (part.type === 'space') {
				result += ' '
			} else if (part.type === 'punctuation') {
				result += part.value
			}
		}
	}

	return result
}
