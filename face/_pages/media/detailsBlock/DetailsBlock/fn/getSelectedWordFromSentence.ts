/**
 * Возвращает текст выбранного слова из предложения по его порядковому `wordId`.
 * Порядок слов определяется через `Intl.Segmenter`, так же как при выделении слов в интерфейсе.
 */
export function getSelectedWordFromSentence(input: {
	sentenceText: null | string
	wordIds: number[]
	locale?: string
}): null | string {
	const { sentenceText, wordIds, locale } = input

	const wordId = wordIds[0]
	if (!wordId || !sentenceText) return null

	const segmenter = new Intl.Segmenter(locale, { granularity: 'word' })
	const segments = [...segmenter.segment(sentenceText)].filter((segment) => segment.isWordLike)

	return segments[wordId - 1]?.segment ?? null
}
