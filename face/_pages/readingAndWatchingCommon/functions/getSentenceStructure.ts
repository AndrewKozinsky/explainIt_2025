/**
 * Gets a sentence and returns an array of words
 * @param sentenceText — sentence to get structure from
 * @returns
 */
export function getSentenceStructure(sentenceText: string) {
	const segmenter = new Intl.Segmenter('en', { granularity: 'word' })
	const sentenceParts = [...segmenter.segment(sentenceText)]

	return sentenceParts.map((part) => {
		return {
			id: part.index,
			isWord: part.isWordLike,
			value: part.segment,
		}
	})
}
