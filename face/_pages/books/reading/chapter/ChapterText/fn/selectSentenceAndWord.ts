import { useCallback } from 'react'
import { ChapterTextStructurePopulated } from '_pages/books/commonLogic/chapterStructureTypes'
import { populatedChapterStructureIntoText } from '_pages/books/commonLogic/populatedChapterStructureIntoText/chapterStructureIntoText'
import { useReadingStore } from '_pages/books/reading/readingStore'

/** Возвращает обработчик нажатия на слово в тексте главы. */
export function useGetSelectSentenceAndWord() {
	const populatedChapter = useReadingStore((s) => s.populatedChapter)

	return useCallback(
		function (sentenceId: number, wordId: number) {
			const selectedSentence = getSelectedSentence(populatedChapter, sentenceId)
			const context = buildContext(populatedChapter, sentenceId, 28)
			if (!selectedSentence || !context) return

			useReadingStore
				.getState()
				.updateSentence({ sentenceId, selectedWordIds: [wordId], context, sentence: selectedSentence.parts })
		},
		[populatedChapter],
	)
}

// Returns selected sentence by sentenceId
export function getSelectedSentence(
	content: ChapterTextStructurePopulated.Chapter | null,
	sentenceId: number,
): ChapterTextStructurePopulated.Sentence | undefined {
	if (!content) return undefined
	const currentIndex = content.findIndex(
		(el): el is ChapterTextStructurePopulated.Sentence => el.type === 'sentence' && el.id === sentenceId,
	)
	if (currentIndex === -1) return undefined
	return content[currentIndex] as ChapterTextStructurePopulated.Sentence
}

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
	return populatedChapterStructureIntoText(contextSlice)
}
