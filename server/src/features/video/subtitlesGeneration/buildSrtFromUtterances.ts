import { DeepgramUtterance, DeepgramWord } from 'infrastructure/deepgramStt/deepgramStt.service'

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
	const cues = utterances
		.flatMap((utterance) => splitUtteranceIntoSentenceCues(utterance))
		.filter((cue) => cue.transcript.length > 0)
		.sort((a, b) => a.start - b.start)

	const lines: string[] = []

	cues.forEach((cue, index) => {
		lines.push(String(index + 1))
		lines.push(`${formatSrtTime(cue.start)} --> ${formatSrtTime(cue.end)}`)
		lines.push(cue.transcript)
		lines.push('')
	})

	return lines.join('\n').trimEnd() + '\n'
}

function splitUtteranceIntoSentenceCues(utterance: DeepgramUtterance): SrtCue[] {
	const transcript = utterance.transcript.trim()
	if (!transcript) return []

	if (utterance.words.length === 0) {
		return [
			{
				start: Math.max(0, utterance.start),
				end: Math.max(utterance.start, utterance.end),
				transcript,
			},
		]
	}

	const cues: SrtCue[] = []
	let sentenceWords: DeepgramWord[] = []

	for (const word of utterance.words) {
		sentenceWords.push(word)

		if (isSentenceEndingWord(word.word)) {
			cues.push(buildCueFromWords(sentenceWords))
			sentenceWords = []
		}
	}

	if (sentenceWords.length > 0) {
		cues.push(buildCueFromWords(sentenceWords))
	}

	return cues
}

function buildCueFromWords(words: DeepgramWord[]): SrtCue {
	const firstWord = words[0]
	const lastWord = words[words.length - 1]

	return {
		start: Math.max(0, firstWord.start),
		end: Math.max(firstWord.start, lastWord.end),
		transcript: words.map((word) => word.word).join(' ').trim(),
	}
}

function isSentenceEndingWord(word: string): boolean {
	return /[.!?…]["'”’)]*$/.test(word)
}

type SrtCue = {
	start: number
	end: number
	transcript: string
}
