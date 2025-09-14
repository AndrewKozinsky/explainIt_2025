import { booksHelper } from '_pages/books/booksHelper'
import { ChapterTextStructureFull } from '_pages/books/chapterStructureTypes'
import { useReadingStore } from '_pages/books/reading/readingStore'
import { useEffect } from 'react'

export function useSetSelectedSentenceToStore() {
	const chapter = useReadingStore((s) => s.chapter)
	const sentenceId = useReadingStore((s) => s.sentence.sentenceId)

	useEffect(
		function () {
			if (!chapter || !sentenceId) return

			const selectedSentence = getSelectedSentence(chapter, sentenceId)
			const context = buildContext(chapter, sentenceId, 30)
			if (!selectedSentence || !context) return

			useReadingStore.getState().updateSentence({
				context,
				sentence: selectedSentence.parts,
			})
		},
		[chapter, sentenceId],
	)
}

// Returns selected sentence by sentenceId
export function getSelectedSentence(
	content: ChapterTextStructureFull.Chapter | null,
	sentenceId: number,
): ChapterTextStructureFull.Sentence | undefined {
	if (!content) return undefined
	const currentIndex = content.findIndex(
		(el): el is ChapterTextStructureFull.Sentence => el.type === 'sentence' && el.id === sentenceId,
	)
	if (currentIndex === -1) return undefined
	return content[currentIndex] as ChapterTextStructureFull.Sentence
}

// Builds textual context around the sentence so that
// - there are at least `thresholdValue` words BEFORE the selected sentence
// - and at least `thresholdValue` words AFTER the selected sentence
// Words from the selected sentence are NOT counted for the thresholds.
// Only whole sentences can be added; overshooting the threshold is acceptable.
export function buildContext(
	content: ChapterTextStructureFull.Chapter | null,
	sentenceId: number,
	thresholdValue = 50,
): string {
	if (!content) return ''

	const currentIndex = content.findIndex(
		(el): el is ChapterTextStructureFull.Sentence => el.type === 'sentence' && el.id === sentenceId,
	)
	if (currentIndex === -1) return ''

	const countWords = (s: ChapterTextStructureFull.Sentence) =>
		s.parts.reduce((acc, p) => acc + (p.type === 'word' ? 1 : 0), 0)

	// Start with the selected sentence bounds
	let minSentenceIdx = currentIndex
	let maxSentenceIdx = currentIndex

	// Collect enough words ABOVE (before) the selected sentence
	let wordsAbove = 0
	for (let i = currentIndex - 1; i >= 0 && wordsAbove < thresholdValue; i--) {
		if (content[i].type === 'sentence') {
			wordsAbove += countWords(content[i] as ChapterTextStructureFull.Sentence)
			minSentenceIdx = i
		}
	}

	// Collect enough words BELOW (after) the selected sentence
	let wordsBelow = 0
	for (let i = currentIndex + 1; i < content.length && wordsBelow < thresholdValue; i++) {
		if (content[i].type === 'sentence') {
			wordsBelow += countWords(content[i] as ChapterTextStructureFull.Sentence)
			maxSentenceIdx = i
		}
	}

	// Slice the original content to preserve spaces/punctuation between the chosen sentences
	const contextSlice = content.slice(minSentenceIdx, maxSentenceIdx + 1)
	return booksHelper.jsonChapterContentStructureToText(JSON.stringify(contextSlice))
}
