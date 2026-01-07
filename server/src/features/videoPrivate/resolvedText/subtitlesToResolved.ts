import { parseSync } from 'subtitle'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { ResolvedSubtitlesStructure } from './resolvedSubtitlesStructure'

type SubtitleCue = {
	startTime: number
	endTime: number
	text: string
}

/**
 * Gets subtitles like:
 * ```
 * 1
 * 00:00:00,160 --> 00:00:02,560
 * Some text
 *
 * 2
 * 00:00:03 --> 00:00:04
 * Another some text
 * ```
 * and converts it into ResolvedSubtitlesStructure.Structure
 *
 * @param mainConfigService
 * @param subtitles
 */
export async function subtitlesToResolved(
	mainConfigService: MainConfigService,
	subtitles?: null | string,
): Promise<ResolvedSubtitlesStructure.Structure> {
	if (!subtitles) {
		return {
			type: 'subtitles',
			subtitles: [],
			sentences: [],
		}
	}

	const subtitlesArr: SubtitleCue[] = parseSync(subtitles)
		.filter((s) => s.type === 'cue')
		.map((sub) => {
			return {
				startTime: sub.data.start,
				endTime: sub.data.end,
				text: sub.data.text,
			}
		})

	const plainTextParts = subtitlesArr.map((s) => normalizeText(s.text)).filter((t) => t.length > 0)

	const plainText = plainTextParts.join(' ')

	const res = await fetch(mainConfigService.get().nlp.containerUrl + '/sentences', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ text: plainText }),
	})

	const data: { sentences: string[] } = await res.json()

	const normalizedPlainText = normalizeText(plainText)
	const normalizedSentences = data.sentences.map((s) => normalizeText(s))

	type SentenceRange = { id: number; start: number; end: number }
	const sentenceRanges: SentenceRange[] = []
	let cursor = 0

	for (let i = 0; i < normalizedSentences.length; i++) {
		const sentence = normalizedSentences[i]
		if (!sentence) continue

		const found = normalizedPlainText.indexOf(sentence, cursor)
		if (found === -1) {
			const start = cursor
			const end = Math.min(normalizedPlainText.length, start + sentence.length)
			sentenceRanges.push({ id: i, start, end })
			cursor = end
			if (normalizedPlainText[cursor] === ' ') cursor++
			continue
		}

		const start = found
		const end = found + sentence.length
		sentenceRanges.push({ id: i, start, end })
		cursor = end
		if (normalizedPlainText[cursor] === ' ') cursor++
	}

	let globalOffset = 0
	const resolvedSubtitles: ResolvedSubtitlesStructure.Subtitle[] = []

	for (let i = 0; i < subtitlesArr.length; i++) {
		const cue = subtitlesArr[i]
		const cueText = normalizeText(cue.text)
		const from = msToTimecode(cue.startTime)
		const to = msToTimecode(cue.endTime)

		const subtitleStart = globalOffset
		const subtitleEnd = subtitleStart + cueText.length
		globalOffset = subtitleEnd
		if (cueText.length > 0) {
			// Account for the separator space we used in plainTextParts.join(' ')
			globalOffset += 1
		}

		const ts: ResolvedSubtitlesStructure.Subtitle['ts'] = []

		if (cueText.length > 0) {
			for (const range of sentenceRanges) {
				const start = Math.max(subtitleStart, range.start)
				const end = Math.min(subtitleEnd, range.end)
				if (start >= end) continue

				const fragment = normalizedPlainText.slice(start, end).trim()
				if (!fragment) continue

				ts.push({ t: fragment, sId: range.id })
			}
		}

		resolvedSubtitles.push({ from, to, ts })
	}

	return {
		type: 'subtitles',
		subtitles: resolvedSubtitles,
		sentences: normalizedSentences
			.map((sentence, id) => {
				if (!sentence) return null
				return { id, s: sentence }
			})
			.filter((s): s is { id: number; s: string } => s !== null),
	}
}

function msToTimecode(ms: number): string {
	const totalMs = Math.max(0, Math.floor(ms))
	const hours = Math.floor(totalMs / 3_600_000)
	const minutes = Math.floor((totalMs % 3_600_000) / 60_000)
	const seconds = Math.floor((totalMs % 60_000) / 1_000)
	const millis = totalMs % 1_000

	const hh = String(hours).padStart(2, '0')
	const mm = String(minutes).padStart(2, '0')
	const ss = String(seconds).padStart(2, '0')
	const mmm = String(millis).padStart(3, '0')

	return `${hh}:${mm}:${ss},${mmm}`
}

function normalizeText(text: string): string {
	return text.replace(/\r\n?/g, '\n').replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim()
}
