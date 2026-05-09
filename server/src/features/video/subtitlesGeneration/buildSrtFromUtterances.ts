import { DeepgramUtterance } from 'infrastructure/deepgramStt/deepgramStt.service'

/**
 * Format seconds into an SRT timestamp: HH:MM:SS,mmm
 */
function formatSrtTime(totalSeconds: number): string {
	const clamped = Math.max(0, totalSeconds)
	const ms = Math.round(clamped * 1000)
	const hours = Math.floor(ms / 3_600_000)
	const minutes = Math.floor((ms % 3_600_000) / 60_000)
	const seconds = Math.floor((ms % 60_000) / 1000)
	const millis = ms % 1000

	const pad = (n: number, width = 2) => String(n).padStart(width, '0')
	return `${pad(hours)}:${pad(minutes)}:${pad(seconds)},${pad(millis, 3)}`
}

/**
 * Convert Deepgram utterances into a standards-compliant SRT string.
 * Empty utterances are skipped; overlapping/out-of-order utterances are sanitized
 * by clamping end >= start and sorting ascending.
 */
export function buildSrtFromUtterances(utterances: DeepgramUtterance[]): string {
	const cleaned = utterances
		.map((u) => ({
			start: Math.max(0, u.start),
			end: Math.max(u.start, u.end),
			transcript: u.transcript.trim(),
		}))
		.filter((u) => u.transcript.length > 0)
		.sort((a, b) => a.start - b.start)

	const lines: string[] = []

	cleaned.forEach((u, index) => {
		lines.push(String(index + 1))
		lines.push(`${formatSrtTime(u.start)} --> ${formatSrtTime(u.end)}`)
		lines.push(u.transcript)
		lines.push('')
	})

	return lines.join('\n').trimEnd() + '\n'
}
