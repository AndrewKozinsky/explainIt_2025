import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { chapterStructureIntoText } from '_pages/books/commonLogic/populatedChapterStructureIntoText/chapterStructureIntoText'

// Builds textual context around the sentence so that
// - there are at least `thresholdValue` words BEFORE the selected sentence
// - and at least `thresholdValue` words AFTER the selected sentence
// Words from the selected sentence are NOT counted for the thresholds.
// Only whole sentences can be added; overshooting the threshold is acceptable.
export function buildContext(
	content: ChapterTextStructurePopulated.Chapter | null,
	sentenceId: number,
	thresholdValue = 100,
): string {
	if (!content) return ''

	const currentIndex = content.findIndex(
		(el): el is ChapterTextStructurePopulated.Sentence => el.type === 'sentence' && el.id === sentenceId,
	)
	if (currentIndex === -1) return ''

	const countWords = (s: ChapterTextStructurePopulated.Sentence) =>
		s.parts.reduce((acc, p) => acc + (p.type === 'word' ? 1 : 0), 0)

	// Start with the selected sentence bounds
	let minSentenceIdx = currentIndex
	let maxSentenceIdx = currentIndex

	// Collect enough words ABOVE (before) the selected sentence
	let wordsAbove = 0
	for (let i = currentIndex - 1; i >= 0 && wordsAbove < thresholdValue; i--) {
		if (content[i].type === 'sentence') {
			wordsAbove += countWords(content[i] as ChapterTextStructurePopulated.Sentence)
			minSentenceIdx = i
		}
	}

	// Collect enough words BELOW (after) the selected sentence
	let wordsBelow = 0
	for (let i = currentIndex + 1; i < content.length && wordsBelow < thresholdValue; i++) {
		if (content[i].type === 'sentence') {
			wordsBelow += countWords(content[i] as ChapterTextStructurePopulated.Sentence)
			maxSentenceIdx = i
		}
	}

	// Slice the original content to preserve spaces/punctuation between the chosen sentences
	const contextSlice = content.slice(minSentenceIdx, maxSentenceIdx + 1)
	return chapterStructureIntoText(contextSlice)
}
