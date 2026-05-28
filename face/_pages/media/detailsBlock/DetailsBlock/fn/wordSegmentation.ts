/*export type SegmentedWord = {
	wordId: number
	word: string
	startOffset: number
	endOffset: number
}*/

/*export function segmentSentence(sentenceText: string, locale?: null | string): SegmentedWord[] {
	const segmenter = new Intl.Segmenter(locale ?? undefined, { granularity: 'word' })
	const segments = [...segmenter.segment(sentenceText)].filter((segment) => segment.isWordLike)

	return segments.map((segment, index) => ({
		wordId: index + 1,
		word: segment.segment,
		startOffset: segment.index,
		endOffset: segment.index + segment.segment.length,
	}))
}*/

/*export function wordIdsFromOffsets(input: {
	sentenceText: string
	locale?: null | string
	startOffset: number
	endOffset: number
}): number[] {
	return segmentSentence(input.sentenceText, input.locale)
		.filter((word) => word.startOffset < input.endOffset && word.endOffset > input.startOffset)
		.map((word) => word.wordId)
}*/

/*export function offsetsFromWordIds(input: {
	sentenceText: string
	locale?: null | string
	wordIds: number[]
}): null | { startOffset: number; endOffset: number; text: string } {
	if (input.wordIds.length === 0) return null

	const wordIdSet = new Set(input.wordIds)

	const selected = segmentSentence(input.sentenceText, input.locale).filter((word) =>
		wordIdSet.has(word.wordId),
	)

	if (selected.length === 0) return null

	const startOffset = Math.min(...selected.map((word) => word.startOffset))
	const endOffset = Math.max(...selected.map((word) => word.endOffset))

	return {
		startOffset,
		endOffset,
		text: input.sentenceText.slice(startOffset, endOffset),
	}
}*/
