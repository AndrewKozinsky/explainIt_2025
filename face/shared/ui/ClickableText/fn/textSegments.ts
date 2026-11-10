/**
 * Кусок текста: слово или промежуток между словами (пробелы, пунктуация).
 * `start` — позиция начала куска в тексте, по ней слова различаются внутри одного текста.
 */
export type TextSegment = { text: string; isWord: boolean; start: number }

const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' })

/** Делит текст на слова и промежутки между ними, сохраняя все символы текста. */
export function segmentText(text: string): TextSegment[] {
	return Array.from(segmenter.segment(text), (segment) => ({
		text: segment.segment,
		isWord: segment.isWordLike ?? false,
		start: segment.index,
	}))
}
