import { Injectable, Logger } from '@nestjs/common'
import { DeepSeekModels } from 'types/AIModels'
import { DeepgramUtterance, DeepgramWord } from 'infrastructure/deepgramStt/deepgramStt.service'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { CueWithOffset, SubtitleCue } from './subtitles.types'

// ─── Private types (internal to VTT → SRT pipeline) ──────────────────────────

type WordTiming = {
	/** The word or punctuation token (e.g. "Hello", "world", "?") */
	word: string
	/** Absolute start time in milliseconds from the beginning of the video */
	startMs: number
}

type SentenceBoundary = {
	text: string
	startMs: number
	endMs: number
}

/**
 * Системный промпт для группировки пословных таймингов в предложения через LLM.
 *
 * LLM получает чистый JSON-массив пар {w, t} (слово + абсолютные миллисекунды
 * от начала видео). Возвращает границы предложений — единственная семантическая
 * задача; все таймкоды уже предоставлены.
 */
const WORDS_TO_SENTENCES_SYSTEM_PROMPT = `You are a precise subtitle formatter. Group words with timestamps into grammatically correct sentences.

INPUT: JSON array of {"w": "word_or_punctuation", "t": start_milliseconds}

RULES:
1. Group consecutive words into complete sentences, using punctuation (. ! ?) and meaning as boundaries. Aim for one sentence per subtitle. Keep sentences reasonably short: if a sentence would exceed ~12 words, split it at a natural pause or meaning boundary.
2. For each sentence set:
   - "startMs" = the "t" value of the sentence's FIRST word
   - "endMs" = the "t" value of the sentence's LAST word + 300 ms
3. Rebuild "text" as clean, correctly punctuated prose:
   - Join words with single spaces.
   - Capitalize the first letter of each sentence.
   - Apply correct capitalization for the input language (e.g. the pronoun "I" and proper nouns in English).
   - Restore contractions and apostrophes where they belong (e.g. "im" -> "I'm", "dont" -> "don't", "youre" -> "you're").
   - End every sentence with a terminal punctuation mark (. ! ?).
4. The input is typically lowercase with no punctuation. Infer correct capitalization and punctuation from meaning. Do not paraphrase, add, or remove words — only fix casing, spacing, contractions, and punctuation.

OUTPUT: valid JSON only, no explanations:
{"sentences": [{"startMs": 400, "endMs": 4480, "text": "When did recognizing rights become something radical?"}, ...]}`

/**
 * Сервис-«швейцарский нож» для работы с форматами субтитров.
 *
 * Предоставляет чистые функции для конвертации между форматами субтитров
 * (SRT, VTT, Deepgram utterances). Не зависит от репозиториев, файловой системы
 * или video-фичи. Единственная внешняя зависимость — LlmAdapterService для
 * YouTube VTT → SRT конвертации.
 */
@Injectable()
export class SubtitlesService {
	private readonly logger = new Logger(SubtitlesService.name)

	constructor(private readonly llmAdapter: LlmAdapterService) {}

	// ─── Public API ──────────────────────────────────────────────────────────

	/**
	 * Проверяет, похож ли переданный текст на формат SRT.
	 * Ищет характерный паттерн временных меток: `HH:MM:SS,mmm --> HH:MM:SS,mmm`.
	 *
	 * @example
	 * subtitlesService.isLikelySrt("1\n00:00:01,000 --> 00:00:02,000\nHello") // true
	 * subtitlesService.isLikelySrt("Plain text without timestamps")            // false
	 */
	isLikelySrt(content: string): boolean {
		if (!content.includes('-->')) return false
		return /\d{2}:\d{2}:\d{2}(?:[,.]\d{1,3})?\s*-->\s*\d{2}:\d{2}:\d{2}(?:[,.]\d{1,3})?/.test(content)
	}

	/**
	 * Разбирает SRT-строку на массив структурированных cues (таймкоды + текст).
	 * Каждый cue содержит время начала, конца, порядковый номер и очищенный текст.
	 *
	 * Возвращает `null` если формат не соответствует SRT (нет валидных блоков
	 * с таймкодами).
	 *
	 * @param content — сырая SRT-строка
	 * @returns массив SubtitleCue или null
	 */
	stringToSrtStructure(content: string): SubtitleCue[] | null {
		const normalized = content.replace(/\r\n?/g, '\n').trim()
		const blocks = normalized.split(/\n{2,}/)

		const cues: SubtitleCue[] = []
		let orderIndex = 0

		for (const block of blocks) {
			const lines = block
				.split('\n')
				.map((l) => l.trim())
				.filter((l) => l.length > 0)

			if (lines.length < 2) continue

			let timeLineIndex = 0
			if (/^\d+$/.test(lines[0])) {
				timeLineIndex = 1
			}

			const timeLine = lines[timeLineIndex]
			const match = timeLine.match(
				/(\d{2}:\d{2}:\d{2}(?:[,.]\d{1,3})?)\s*-->\s*(\d{2}:\d{2}:\d{2}(?:[,.]\d{1,3})?)/,
			)
			if (!match) continue

			const startTimeMs = this.parseSrtTimeToMs(match[1])
			const endTimeMs = this.parseSrtTimeToMs(match[2])

			const textLines = lines.slice(timeLineIndex + 1)
			const cueText = dryText(textLines.join(' '))
			if (!cueText) continue

			cues.push({
				startTimeMs,
				endTimeMs,
				text: cueText,
				orderIndex,
			})
			orderIndex++
		}

		if (cues.length === 0) return null

		return cues
	}

	/**
	 * Склеивает тексты cues в единый plain text и вычисляет позиции
	 * (startOffset, length) каждого cue относительно этого текста.
	 *
	 * @param cues — результат parseSrt()
	 * @returns plainText и cues с заполненными offset'ами
	 */
	cuesToPlainText(cues: SubtitleCue[]): { plainText: string; cues: CueWithOffset[] } {
		let plainText = ''
		let globalOffset = 0

		const cuesWithOffset: CueWithOffset[] = cues.map((cue) => {
			if (plainText.length > 0 && !plainText.endsWith(' ')) {
				plainText += ' '
				globalOffset += 1
			}

			const startOffset = globalOffset
			plainText += cue.text
			globalOffset += cue.text.length

			return {
				...cue,
				startOffset,
				length: cue.text.length,
			}
		})

		return { plainText: plainText.trim(), cues: cuesWithOffset }
	}

	/**
	 * Конвертирует результат распознавания речи Deepgram в SRT-строку.
	 * Группирует слова внутри utterance'ов по предложениям (по знакам .!?),
	 * форматирует с правильными SRT-таймкодами.
	 *
	 * @param utterances — сырой результат Deepgram API (поле utterances из ответа)
	 * @returns готовая SRT-строка, пригодная для сохранения в БД
	 */
	utterancesToSrt(utterances: DeepgramUtterance[]): string {
		const cues = utterances
			.flatMap((utterance) => splitUtteranceIntoSentenceCues(utterance))
			.filter((cue) => cue.transcript.length > 0)
			.sort((a, b) => a.start - b.start)

		const lines: string[] = []

		cues.forEach((cue, index) => {
			lines.push(String(index + 1))
			// cue.start/end are in seconds (Deepgram), convert to ms
			lines.push(
				`${formatSrtTimeMs(Math.round(cue.start * 1000))} --> ${formatSrtTimeMs(Math.round(cue.end * 1000))}`,
			)
			lines.push(cue.transcript)
			lines.push('')
		})

		return lines.join('\n').trimEnd() + '\n'
	}

	/**
	 * Конвертирует субтитры из формата YouTube (VTT с пословными таймингами)
	 * в формат SRT.
	 *
	 * Пайплайн внутри:
	 * 1. Извлекает пословные тайминги из VTT и очищает их от мусора (HTML-entities, маркеры `[Music]`)
	 * 2. Группирует слова в предложения через LLM (DeepSeek), нормализуя регистр и пунктуацию
	 * 3. Детерминированно дочищает текст и устраняет перекрытия/зазоры между предложениями
	 * 4. Форматирует в SRT
	 *
	 * Бросает ошибку, если LLM не смог обработать — вызывающий код решает,
	 * использовать ли fallback (например, Deepgram).
	 *
	 * @param vttContent — сырое содержимое YouTube VTT (то что вернул YouTube API)
	 * @returns готовая SRT-строка
	 */
	async convertYouTubeSubtitlesToSrt(vttContent: string): Promise<string> {
		const wordTimings = parseVttToWordTimings(vttContent)
		this.logger.log(`Extracted ${wordTimings.length} word timings from YouTube VTT`)

		const llmResult = await this.llmAdapter.generate({
			model: DeepSeekModels.Flash,
			responseFormat: 'json_object',
			messages: [
				{ role: 'system', content: WORDS_TO_SENTENCES_SYSTEM_PROMPT },
				{ role: 'user', content: JSON.stringify(wordTimings) },
			],
		})

		this.logger.log(
			'LLM sentence grouping done ' +
				`(input=${llmResult.inputTokens} tokens, output=${llmResult.outputTokens} tokens)`,
		)

		const parsed = JSON.parse(llmResult.content) as { sentences: SentenceBoundary[] }
		const sentences = normalizeSentenceEndTimes(
			parsed.sentences
				.map((s) => ({ ...s, text: normalizeSentenceText(s.text) }))
				.filter((s) => s.text.length > 0),
		)
		const srt = buildSrtFromSentences(sentences)

		this.logger.log(`Built SRT with ${sentences.length} sentence(s) from YouTube VTT`)
		return srt
	}

	// ─── Private: SRT time parsing / formatting ──────────────────────────────

	/**
	 * Парсит SRT-таймкод (HH:MM:SS,mmm или HH:MM:SS.mmm) в миллисекунды.
	 */
	private parseSrtTimeToMs(time: string): number {
		const t = time.replace(',', '.')
		const match = t.match(/^(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?$/)
		if (!match) {
			throw new Error(`Invalid SRT time format: "${time}"`)
		}

		const hours = Number(match[1])
		const minutes = Number(match[2])
		const seconds = Number(match[3])
		const msPart = match[4] ?? '0'
		const ms = Number(msPart.padEnd(3, '0'))

		return hours * 3_600_000 + minutes * 60_000 + seconds * 1_000 + ms
	}
}

// ─── Private helpers (module-level, not exported) ──────────────────────────

/** Make text flat: remove line breaks and collapse excessive whitespace */
function dryText(text: string): string {
	return text
		.replace(/[\r\n]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}

// ─── Private: buildSrtFromUtterances helpers ────────────────────────────────

type SrtCue = {
	start: number // seconds for internal use, converted to ms before formatting
	end: number
	transcript: string
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
		transcript: words
			.map((word) => word.word)
			.join(' ')
			.trim(),
	}
}

function isSentenceEndingWord(word: string): boolean {
	return /[.!?…]["'”’)]*$/.test(word)
}

// ─── Private: parseVttToWordTimings helpers ─────────────────────────────────

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
 * 6. Clean each word token: decode HTML entities and drop bracketed annotations.
 */
function parseVttToWordTimings(vtt: string): WordTiming[] {
	const words: WordTiming[] = []
	const lines = vtt.split('\n')
	let blockStartMs = 0

	for (const rawLine of lines) {
		const line = rawLine.trim()
		if (!line) continue

		// Skip headers & metadata
		if (
			line === 'WEBVTT' ||
			/^(Kind|Language):/i.test(line) ||
			line.startsWith('NOTE') ||
			/^(align|position):/i.test(line)
		) {
			continue
		}

		// Capture block timestamp
		const blockTsMatch = line.match(/^(\d{2}):(\d{2}):(\d{2})\.(\d{3})\s*-->/)
		if (blockTsMatch) {
			blockStartMs = hmsToMs(blockTsMatch[1], blockTsMatch[2], blockTsMatch[3], blockTsMatch[4])
			continue
		}

		// Skip plain-text lines (snapshots — they duplicate building-block text)
		if (!/<(\d{2}:\d{2}:\d{2}\.\d{3})>/.test(line)) continue

		// Extract word timestamps
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
				const clean = cleanWordToken(word)
				if (clean === null) continue
				words.push({ word: clean, startMs: currentMs })
			}
		}
	}

	return words
}

function hmsToMs(h: string, m: string, s: string, ms: string): number {
	return Number(h) * 3_600_000 + Number(m) * 60_000 + Number(s) * 1_000 + Number(ms)
}

/** Common named HTML entities found in YouTube VTT (e.g. `&nbsp;` inside music markers). */
const HTML_ENTITIES: Record<string, string> = {
	nbsp: ' ',
	amp: '&',
	lt: '<',
	gt: '>',
}

/**
 * Decode HTML entities (`&nbsp;`, `&amp;`, numeric `&#123;`) into plain text.
 * Unknown entities are left unchanged.
 */
function decodeHtmlEntities(text: string): string {
	return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity: string) => {
		if (entity[0] === '#') {
			const isHex = entity[1] === 'x' || entity[1] === 'X'
			const code = Number.parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10)
			if (Number.isNaN(code) || code < 0 || code > 0x10ffff) return match
			return String.fromCodePoint(code)
		}
		return HTML_ENTITIES[entity] ?? match
	})
}

/**
 * Clean a single word token extracted from YouTube VTT.
 *
 * Drops YouTube's bracketed annotations (`[Music]`, `[Applause]`, `[ __ ]`,
 * `[&nbsp;__&nbsp;]`) which carry no speech, and decodes HTML entities in the
 * remaining text. Returns `null` when the token has no speech content.
 */
function cleanWordToken(rawWord: string): string | null {
	const decoded = decodeHtmlEntities(rawWord)

	// A token that is entirely a bracketed annotation carries no speech.
	if (decoded.startsWith('[') && decoded.endsWith(']')) return null

	// Defensive: strip any bracket annotations glued to real words.
	const cleaned = decoded
		.replace(/\[.*?]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()

	// Drop tokens with no letter or digit (leftover `[`, `]`, `__`, punctuation).
	if (!/[A-Za-zÀ-ÖØ-öø-ÿ0-9]/.test(cleaned)) return null

	return cleaned
}

// ─── Private: buildSrtFromSentences helpers ─────────────────────────────────

function buildSrtFromSentences(sentences: SentenceBoundary[]): string {
	const lines: string[] = []

	sentences.forEach((sentence, idx) => {
		lines.push(String(idx + 1))
		lines.push(`${formatSrtTimeMs(sentence.startMs)} --> ${formatSrtTimeMs(sentence.endMs)}`)
		lines.push(sentence.text)
		lines.push('')
	})

	return lines.join('\n').trimEnd() + '\n'
}

function formatSrtTimeMs(ms: number): string {
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
function normalizeSentenceEndTimes(sentences: SentenceBoundary[]): SentenceBoundary[] {
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

/**
 * Deterministic safety net for sentence text returned by the LLM.
 *
 * The LLM normalizes casing and punctuation, but this guarantees the basics
 * even when the LLM misses: flatten whitespace, strip any bracket annotations
 * that slipped through, capitalize the first letter, and ensure a terminal
 * punctuation mark.
 */
function normalizeSentenceText(text: string): string {
	let t = text
		.replace(/\[.*?]/g, ' ')
		.replace(/[\r\n]+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim()

	if (!t) return t

	t = t.charAt(0).toUpperCase() + t.slice(1)

	if (!/[.!?…]["'”’)]*$/.test(t)) {
		t += '.'
	}

	return t
}
