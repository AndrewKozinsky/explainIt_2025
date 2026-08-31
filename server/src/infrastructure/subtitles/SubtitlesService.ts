import { Injectable } from '@nestjs/common'
import { dryText } from 'utils/stringUtils'
import { DeepgramUtterance, DeepgramWord } from 'infrastructure/deepgramStt/deepgramStt.service'
import { LlmAdapterService } from 'infrastructure/llmProviderAdapter/LlmAdapter.service'
import { formatSrtTimeMs } from './srtFormat'
import { CueWithOffset, SubtitleCue } from './subtitles.types'
import { convertYoutubeVttToSrt } from './youtubeVttToSrt'

/**
 * Сервис-«швейцарский нож» для работы с форматами субтитров.
 *
 * Предоставляет чистые функции для конвертации между форматами субтитров
 * (SRT, VTT, Deepgram utterances). Не зависит от репозиториев, файловой системы
 * или video-фичи. Конвертация YouTube VTT → SRT вынесена в отдельный модуль
 * {@link convertYoutubeVttToSrt}, здесь остался только тонкий метод-делегат.
 */
@Injectable()
export class SubtitlesService {
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
	 * Группирует слова всех utterance'ов по предложениям (по знакам .!?),
	 * поэтому предложение, которое Deepgram разделил между utterance'ами,
	 * остаётся одним subtitle cue.
	 * форматирует с правильными SRT-таймкодами.
	 *
	 * @param utterances — сырой результат Deepgram API (поле utterances из ответа)
	 * @returns готовая SRT-строка, пригодная для сохранения в БД
	 */
	utterancesToSrt(utterances: DeepgramUtterance[]): string {
		const cues = splitUtterancesIntoSentenceCues(utterances)
			.filter((cue) => cue.transcript.length > 0)
			.sort((a, b) => a.start - b.start)

		const lines: string[] = []
		let previousEndMs: number | null = null

		cues.forEach((cue, index) => {
			// cue.start/end are in seconds (Deepgram), convert to ms
			let startMs = Math.round(cue.start * 1000)
			let endMs = Math.round(cue.end * 1000)

			// Deepgram boundaries often touch or overlap after rounding, which makes
			// the end of one cue equal the start of the next. Keep cues strictly
			// sequential so players never render two cues at the same instant.
			if (previousEndMs !== null && startMs === previousEndMs) {
				startMs = previousEndMs + 1
			}
			if (endMs < startMs) {
				endMs = startMs
			}

			lines.push(String(index + 1))
			lines.push(`${formatSrtTimeMs(startMs)} --> ${formatSrtTimeMs(endMs)}`)
			lines.push(cue.transcript)
			lines.push('')

			previousEndMs = endMs
		})

		return lines.join('\n').trimEnd() + '\n'
	}

	/**
	 * Конвертирует субтитры YouTube (VTT) в формат SRT.
	 *
	 * Сама логика — определение вида субтитров (ручные/авто) и соответствующая
	 * конвертация — вынесена в {@link convertYoutubeVttToSrt}. Здесь только
	 * делегирование, чтобы не раздувать сервис.
	 *
	 * @param vttContent — сырое содержимое YouTube VTT (то что вернул YouTube API)
	 * @returns готовая SRT-строка
	 */
	async convertYouTubeSubtitlesToSrt(vttContent: string): Promise<string> {
		return convertYoutubeVttToSrt(vttContent, this.llmAdapter)
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

type SrtCue = {
	start: number // seconds for internal use, converted to ms before formatting
	end: number
	transcript: string
}

function splitUtterancesIntoSentenceCues(utterances: DeepgramUtterance[]): SrtCue[] {
	const cues: SrtCue[] = []
	let sentenceWords: DeepgramWord[] = []

	for (const utterance of utterances) {
		if (utterance.words.length === 0) {
			// Deepgram normally returns words with utterances. Keep a safe fallback
			// for responses where word-level timestamps are unavailable.
			if (sentenceWords.length > 0) {
				cues.push(buildCueFromWords(sentenceWords))
				sentenceWords = []
			}

			if (utterance.transcript.trim()) {
				cues.push({
					start: Math.max(0, utterance.start),
					end: Math.max(utterance.start, utterance.end),
					transcript: utterance.transcript.trim(),
				})
			}

			continue
		}

		for (const word of utterance.words) {
			sentenceWords.push(word)

			if (isSentenceEndingWord(word.word)) {
				cues.push(buildCueFromWords(sentenceWords))
				sentenceWords = []
			}
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
