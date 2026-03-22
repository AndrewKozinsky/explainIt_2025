/**
 * Gets a sentence and returns an array of words
 * @param sentenceText — sentence to get structure from
 * @param locale — language code
 * @returns
 */
export function getSentenceStructure(sentenceText: string, locale?: string) {
	const segmenter = new Intl.Segmenter(locale, { granularity: 'word' })
	const sentenceParts = [...segmenter.segment(sentenceText)]

	return sentenceParts.map((part) => {
		return {
			id: part.index,
			isWord: part.isWordLike,
			value: part.segment,
		}
	})
}
