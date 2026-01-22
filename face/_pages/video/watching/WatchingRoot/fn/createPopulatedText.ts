import { PopulatedSubtitlesStructure } from '_pages/video/watching/common/populatedSubtitlesStructure'
import { PopulatedTextStructure } from '_pages/video/watching/common/populatedTextStructure'
import { ResolvedSubtitlesStructure } from '_pages/video/watching/common/resolvedSubtitlesStructure'
import { ResolvedTextStructure } from '_pages/video/watching/common/resolvedTextStructure'
import { sentenceToParts } from './sentenceToParts'

export function createPopulatedPlainText(
	resolvedTextStructure: ResolvedTextStructure.Structure,
): PopulatedTextStructure.Structure {
	return {
		sentences: resolvedTextStructure.sentences.map((resolvedSentence, i) => {
			return {
				id: i,
				parts: sentenceToParts(resolvedSentence.s),
				translation: resolvedSentence.t,
			}
		}),
		selected: {
			sentenceId: null,
			wordIds: [],
		},
	}
}

export function createPopulatedSubtitles(
	resolvedSubtitlesStructure: ResolvedSubtitlesStructure.Structure,
): PopulatedSubtitlesStructure.Structure {
	const subtitles = createSubtitlesWithSpeechlessBars(resolvedSubtitlesStructure)

	return {
		subtitles,
		sentences: resolvedSubtitlesStructure.sentences.map((resolvedSentence, i) => {
			const baseParts = sentenceToParts(resolvedSentence.s)
			const text = baseParts.map((part) => {
				if (part.type === 'space') return { id: part.id, type: 'space' } as const
				return { id: part.id, type: part.type, value: part.value } as const
			})

			return {
				id: i,
				text,
				translation: resolvedSentence.t,
			}
		}),
		selected: {
			sentenceId: null,
			wordIds: [],
		},
		playingSubtitleOrSpeechlessBarId: 0,
	}
}

function createSubtitlesWithSpeechlessBars(
	resolvedSubtitlesStructure: ResolvedSubtitlesStructure.Structure,
): PopulatedSubtitlesStructure.Structure['subtitles'] {
	const subtitles: PopulatedSubtitlesStructure.Structure['subtitles'] = []
	let id = 0
	let prevEndMs = 0
	const partsWithRangesBySentenceId = new Map<
		number,
		{ parts: PopulatedSubtitlesStructure.TextPart[]; ranges: { start: number; end: number }[] }
	>()
	const sentenceCursorBySentenceId = new Map<number, number>()

	for (let i = 0; i < resolvedSubtitlesStructure.subtitles.length; i++) {
		const subtitle = resolvedSubtitlesStructure.subtitles[i]
		const fromMs = timeCodeToMs(subtitle.from)
		const toMs = timeCodeToMs(subtitle.to)

		if (fromMs > prevEndMs) {
			subtitles.push({
				type: 'speechlessBar',
				id: id,
				fromSeconds: prevEndMs / 1000,
				toSeconds: fromMs / 1000,
			})
			id += 1
		}

		subtitles.push({
			type: 'subtitle',
			id: id,
			from: subtitle.from,
			fromSeconds: fromMs / 1000,
			to: subtitle.to,
			toSeconds: toMs / 1000,
			texts: subtitle.ts.map((text) => {
				const sentenceId = text.sId
				const cursor = sentenceCursorBySentenceId.get(sentenceId) ?? 0
				const { textParts, nextCursor } = createTextPartsWithSentenceIds(
					resolvedSubtitlesStructure,
					partsWithRangesBySentenceId,
					sentenceId,
					text.t,
					cursor,
				)
				sentenceCursorBySentenceId.set(sentenceId, nextCursor)

				return {
					textParts,
					sentenceId,
				}
			}),
		})

		id += 1
		prevEndMs = Math.max(prevEndMs, toMs)
	}

	return subtitles
}

/**
 * Converts a subtitle text fragment (`text`) into `TextPart[]` with `id`s that match the
 * corresponding parts of the full sentence (from `resolvedSubtitlesStructure.sentences[sentenceId].s`).
 *
 * Why:
 * - One sentence can be split across multiple subtitles.
 * - Selection logic uses `wordIds` to pick parts from the full sentence.
 * - So each subtitle fragment must reuse the same part ids as the full sentence, not start from 0.
 *
 * How:
 * - Build (and cache) full-sentence parts + their character ranges in `fullSentence`.
 * - Locate the fragment `text` inside `fullSentence` starting from `startSearchPos`.
 * - Return all full-sentence parts whose ranges intersect the fragment range.
 *
 * Assumptions:
 * - Subtitles come in time order, so `startSearchPos` can advance monotonically for a given sentence.
 * - `text` is usually an exact substring of `fullSentence`.
 */
function createTextPartsWithSentenceIds(
	resolvedSubtitlesStructure: ResolvedSubtitlesStructure.Structure,
	partsWithRangesBySentenceId: Map<
		number,
		{ parts: PopulatedSubtitlesStructure.TextPart[]; ranges: { start: number; end: number }[] }
	>,
	sentenceId: number,
	text: string,
	startSearchPos: number,
): { textParts: PopulatedSubtitlesStructure.TextPart[]; nextCursor: number } {
	const fullSentence = resolvedSubtitlesStructure.sentences[sentenceId]?.s ?? ''
	if (!fullSentence) {
		const baseParts = sentenceToParts(text)
		const textParts = baseParts.map((part) => {
			if (part.type === 'space') return { id: part.id, type: 'space' } as const
			return { id: part.id, type: part.type, value: part.value } as const
		})

		return {
			textParts,
			nextCursor: startSearchPos + text.length,
		}
	}

	const cached = getOrCreatePartsWithRanges(partsWithRangesBySentenceId, sentenceId, fullSentence)
	let startPos = fullSentence.indexOf(text, startSearchPos)
	if (startPos === -1 && startSearchPos !== 0) {
		startPos = fullSentence.indexOf(text)
	}
	if (startPos === -1) {
		const baseParts = sentenceToParts(text)
		const textParts = baseParts.map((part) => {
			if (part.type === 'space') return { id: part.id, type: 'space' } as const
			return { id: part.id, type: part.type, value: part.value } as const
		})

		return {
			textParts,
			nextCursor: startSearchPos + text.length,
		}
	}
	const endPos = startPos + text.length

	const result: PopulatedSubtitlesStructure.TextPart[] = []
	for (let i = 0; i < cached.parts.length; i++) {
		const range = cached.ranges[i]
		if (range.end <= startPos) continue
		if (range.start >= endPos) break

		const part = cached.parts[i]
		if (part.type === 'space') {
			result.push({ id: part.id, type: 'space' })
		} else if (part.type === 'word') {
			result.push({ id: part.id, type: 'word', value: part.value })
		} else {
			result.push({ id: part.id, type: 'punctuation', value: part.value })
		}
	}

	return { textParts: result, nextCursor: endPos }
}

/**
 * Returns cached full-sentence parts and their `[start, end)` character ranges.
 *
 * `ranges[i]` corresponds to `parts[i]`.
 * - For `space` parts, the range is the run of whitespace at current `cursor`.
 * - For `word`/`punctuation`, the range is located via `indexOf(value, cursor)`.
 *
 * The result is used to map subtitle fragments to exact part ids from the full sentence.
 */
function getOrCreatePartsWithRanges(
	partsWithRangesBySentenceId: Map<
		number,
		{ parts: PopulatedSubtitlesStructure.TextPart[]; ranges: { start: number; end: number }[] }
	>,
	sentenceId: number,
	fullSentence: string,
): { parts: PopulatedSubtitlesStructure.TextPart[]; ranges: { start: number; end: number }[] } {
	const existing = partsWithRangesBySentenceId.get(sentenceId)
	if (existing) return existing

	const baseParts = sentenceToParts(fullSentence)
	const parts: PopulatedSubtitlesStructure.TextPart[] = baseParts.map((part) => {
		if (part.type === 'space') return { id: part.id, type: 'space' }
		return { id: part.id, type: part.type, value: part.value }
	})

	const ranges: { start: number; end: number }[] = []
	let cursor = 0
	for (const part of parts) {
		if (part.type === 'space') {
			let start = cursor
			while (cursor < fullSentence.length && /\s/u.test(fullSentence[cursor])) cursor++
			ranges.push({ start, end: cursor })
			continue
		}

		const value = part.value
		const start = fullSentence.indexOf(value, cursor)
		const end = start === -1 ? cursor : start + value.length
		ranges.push({ start, end })
		cursor = Math.max(cursor, end)
	}

	partsWithRangesBySentenceId.set(sentenceId, { parts, ranges })
	return partsWithRangesBySentenceId.get(sentenceId)!
}

function timeCodeToMs(timeCode: string): number {
	const trimmed = timeCode.trim()
	const match = trimmed.match(/^(\d+):(\d{2}):(\d{2})(?:[,.](\d{1,3}))?$/)
	if (!match) return 0

	const hours = parseInt(match[1])
	const minutes = parseInt(match[2])
	const seconds = parseInt(match[3])
	const msStr = match[4] ?? '0'
	const millis = parseInt(msStr.padEnd(3, '0'))

	return hours * 3_600_000 + minutes * 60_000 + seconds * 1_000 + millis
}
