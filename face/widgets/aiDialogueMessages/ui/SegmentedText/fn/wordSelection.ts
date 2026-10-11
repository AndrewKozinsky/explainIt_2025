import type { AiDialogueWordMapBlock } from '@/widgets/aiDialogueMessages/types/aiDialogueWordMap'

export type DialogueTextSegment = { text: string; isWord: boolean; start: number; wordId?: number }

const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' })

/** Ready maps supply server token positions, avoiding differences between browser/server segmentation. */
export function splitDialogueText(text: string, map?: AiDialogueWordMapBlock): DialogueTextSegment[] {
	if (!map || map.content !== text) {
		return Array.from(segmenter.segment(text), (segment) => ({
			text: segment.segment,
			isWord: segment.isWordLike ?? false,
			start: segment.index,
		}))
	}

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
