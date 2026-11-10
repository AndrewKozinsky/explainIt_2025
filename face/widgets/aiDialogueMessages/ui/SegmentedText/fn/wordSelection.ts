import { segmentText } from '@/shared/ui/ClickableText/fn/textSegments'
import type { TextSegment } from '@/shared/ui/ClickableText/fn/textSegments'
import type { AiDialogueWordMapBlock } from '@/widgets/aiDialogueMessages/types/aiDialogueWordMap'

export type DialogueTextSegment = TextSegment & { wordId?: number }

const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' })

/** Ready maps supply server token positions, avoiding differences between browser/server segmentation. */
export function splitDialogueText(text: string, map?: AiDialogueWordMapBlock): DialogueTextSegment[] {
	if (!map || map.content !== text) return segmentText(text)

	const segments: DialogueTextSegment[] = []
	let offset = 0

	for (const word of map.words) {
		if (word.start > offset) segments.push({ text: text.slice(offset, word.start), isWord: false, start: offset })
		segments.push({ text: text.slice(word.start, word.end), isWord: true, start: word.start, wordId: word.id })
		offset = word.end
	}

	if (offset < text.length) segments.push({ text: text.slice(offset), isWord: false, start: offset })

	return segments
}

export function resolveDialogueWordSelection(content: string, offset: number | null, map?: AiDialogueWordMapBlock) {
	if (offset === null || !map || map.content !== content) return undefined
	const word = map.words.find((item) => item.start <= offset && item.end > offset)
	return word ? map.selections.find((item) => item.wordId === word.id) : undefined
}

/** A click never waits for analysis and is never replaced by a later map update. */
export function dictionaryPhraseForClick(
	content: string,
	segment: DialogueTextSegment,
	map?: AiDialogueWordMapBlock,
): string {
	return resolveDialogueWordSelection(content, segment.start, map)?.phrase || segment.text
}

/**
 * Начала слов, которые подсвечиваются при наведении на hoveredSegment, — ровно то, что уйдёт в Словарь при клике:
 * все слова собственной записи слова в карте (в том числе несмежные) или только само слово, если карты/записи нет.
 * Карта разреженная и несимметричная: запись `Plenty of` может быть только у `of`, тогда наведение на `Plenty`
 * подсвечивает одно `Plenty`. Слова выражения, которых нет среди сегментов текста, пропускаются.
 */
export function getHighlightedWordStarts(
	content: string,
	segments: DialogueTextSegment[],
	hoveredSegment: DialogueTextSegment,
	map?: AiDialogueWordMapBlock,
): Set<number> {
	const selection = resolveDialogueWordSelection(content, hoveredSegment.start, map)
	if (!selection || !map) return new Set([hoveredSegment.start])

	const selectedStarts = new Set(
		map.words.filter((word) => selection.wordIds.includes(word.id)).map((word) => word.start),
	)
	const wordStarts = segments.filter((segment) => segment.isWord).map((segment) => segment.start)
	const highlightedStarts = new Set(wordStarts.filter((start) => selectedStarts.has(start)))
	highlightedStarts.add(hoveredSegment.start)

	return highlightedStarts
}

/**
 * Карта, в которой весь текст — одно выражение: клик и наведение на любое слово выбирают текст целиком.
 * Нужна для коротких подписей вроде должности персонажа (`music shop assistant`).
 */
export function buildWholeTextWordMap(text: string): AiDialogueWordMapBlock {
	const words = Array.from(segmenter.segment(text))
		.filter((segment) => segment.isWordLike)
		.map((segment, id) => ({
			id,
			text: segment.segment,
			start: segment.index,
			end: segment.index + segment.segment.length,
		}))

	const wordIds = words.map((word) => word.id)
	const phrase = text.trim()

	return { content: text, words, selections: wordIds.map((wordId) => ({ wordId, wordIds, phrase })) }
}
