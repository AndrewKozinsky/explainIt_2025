/**
 * VTT word-level timestamp parser.
 *
 * YouTube auto-generated VTT has a peculiar structure:
 * - Block timestamps: "00:00:00.080 --> 00:00:02.389 align:start position:0%"
 * - Word timestamps embedded in text: "When<00:00:00.400><c> did</c><00:00:00.640>…"
 * - "Snapshot" blocks (~10 ms) that duplicate partial text
 *
 * This parser extracts clean { word, startMs } pairs from the raw VTT,
 * discarding snapshots, block metadata, and markup tags.
 */

export type WordTiming = {
	/** The word or punctuation token (e.g. "Hello", "world", "?") */
	word: string
	/** Absolute start time in milliseconds from the beginning of the video */
	startMs: number
}

/**
 * Parse raw YouTube VTT into a flat array of word-timing pairs.
 *
 * Algorithm:
 * 1. Skip headers (WEBVTT, Kind:, Language:, NOTE) and snapshot blocks.
 * 2. For each "building" block, capture the block start time.
 * 3. Split the text line by `<HH:MM:SS.mmm>` markers.
 * 4. The first word(s) use the block start time; each subsequent segment
 *    inherits the preceding timestamp.
 * 5. Strip `<c>` / `</c>` styling tags.
 */
export function parseVttToWordTimings(vtt: string): WordTiming[] {
	const words: WordTiming[] = []
	const lines = vtt.split('\n')
	let blockStartMs = 0

	let blockLineCount = 0
	let wordLineCount = 0

	for (const rawLine of lines) {
		const line = rawLine.trim()
		if (!line) continue

		// ── Skip headers & metadata ──────────────────────────────────────────
		if (
			line === 'WEBVTT' ||
			/^(Kind|Language):/i.test(line) ||
			line.startsWith('NOTE') ||
			/^(align|position):/i.test(line)
		) {
			continue
		}

		// ── Capture block timestamp ──────────────────────────────────────────
		const blockTsMatch = line.match(/^(\d{2}):(\d{2}):(\d{2})\.(\d{3})\s*-->/)
		if (blockTsMatch) {
			blockStartMs = hmsToMs(blockTsMatch[1], blockTsMatch[2], blockTsMatch[3], blockTsMatch[4])
			blockLineCount++
			continue
		}

		// ── Skip plain-text lines (snapshots — they duplicate building-block text) ──
		if (!/<(\d{2}:\d{2}:\d{2}\.\d{3})>/.test(line)) continue

		wordLineCount++

		// ── Extract word timestamps ──────────────────────────────────────────
		// Remove <c> / </c> styling tags, then split by timestamp markers
		const cleaned = line.replace(/<\/?c[^>]*>/g, '')
		const parts = cleaned.split(/(<\d{2}:\d{2}:\d{2}\.\d{3}>)/)

		// First segment = word(s) before any timestamp → use block start
		let currentMs = blockStartMs

		for (const part of parts) {
			if (!part) continue

			const tsMatch = part.match(/^<(\d{2}):(\d{2}):(\d{2})\.(\d{3})>$/)
			if (tsMatch) {
				currentMs = hmsToMs(tsMatch[1], tsMatch[2], tsMatch[3], tsMatch[4])
				continue
			}

			// Extract individual words from this segment
			const textWords = part
				.trim()
				.split(/\s+/)
				.filter((w) => w.length > 0)
			for (const word of textWords) {
				words.push({ word, startMs: currentMs })
			}
		}
	}

	// eslint-disable-next-line no-console
	console.log(
		`[parseVttToWordTimings] total lines=${lines.length}, ` +
			`block lines=${blockLineCount}, word lines=${wordLineCount}, words extracted=${words.length}`,
	)

	return words
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function hmsToMs(h: string, m: string, s: string, ms: string): number {
	return Number(h) * 3_600_000 + Number(m) * 60_000 + Number(s) * 1_000 + Number(ms)
}

// ─── SRT builders ───────────────────────────────────────────────────────────

export type SentenceBoundary = {
	text: string
	startMs: number
	endMs: number
}

/**
 * Build SRT from word timings and LLM-determined sentence boundaries.
 *
 * Sentence `endMs` is computed as the start of the next sentence minus a
 * 50 ms gap. For the final sentence the last word's start + 1000 ms is used.
 */
export function buildSrtFromSentences(sentences: SentenceBoundary[]): string {
	const lines: string[] = []

	sentences.forEach((sentence, idx) => {
		lines.push(String(idx + 1))
		lines.push(`${formatSrtTime(sentence.startMs)} --> ${formatSrtTime(sentence.endMs)}`)
		lines.push(sentence.text)
		lines.push('')
	})

	return lines.join('\n').trimEnd() + '\n'
}

function formatSrtTime(ms: number): string {
	const clamped = Math.max(0, Math.floor(ms))
	const h = Math.floor(clamped / 3_600_000)
	const m = Math.floor((clamped % 3_600_000) / 60_000)
	const s = Math.floor((clamped % 60_000) / 1_000)
	const millis = clamped % 1_000

	const pad = (n: number, w = 2) => String(n).padStart(w, '0')
	return `${pad(h)}:${pad(m)}:${pad(s)},${pad(millis, 3)}`
}

/**
 * Compute final `endMs` for each sentence boundary that the LLM returned.
 *
 * The LLM provides `startMs` accurately (first word's timestamp), but
 * `endMs` is approximate. We tighten it so consecutive sentences don't
 * overlap and don't have large gaps.
 */
export function normalizeSentenceEndTimes(sentences: SentenceBoundary[]): SentenceBoundary[] {
	if (sentences.length === 0) return sentences

	return sentences.map((s, i) => {
		let endMs: number
		if (i < sentences.length - 1) {
			// End = next sentence start − 50 ms gap
			endMs = Math.max(s.startMs + 100, sentences[i + 1].startMs - 50)
		} else {
			// Last sentence: use LLM's endMs but ensure minimum duration
			endMs = Math.max(s.startMs + 500, s.endMs)
		}
		return { ...s, endMs }
	})
}
