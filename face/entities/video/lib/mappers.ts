import { mapVideoSentencesToModels } from '@/entities/media/repository/SentenceMappers'
import type { SentenceModel } from '@/entities/media/repository/SentenceTypes'
import { getSentenceStructure } from '@/entities/sentencesAndSubtitles/Sentence/fn/getSentenceStructure'
import type { VideoLiteOutModel, VideoOutModel } from '@/shared/api/generated/models'
import { extractString, extractNumber, extractBoolean } from '@/shared/utils/extractors'
import { LanguageCode } from '@/shared/utils/languages'
import { formatDurationSec } from '@/shared/utils/time'
import type {
	VideoContentType,
	VideoLiteModel,
	VideoModel,
	VideoSubtitlesModel,
	SubtitlesSourceModelType,
	SubtitlesStatusModelType,
} from './types'

// ─── Мапперы моделей ─────────────────────────────────────────────────────────

/**
 * Маппит {@link VideoLiteOutModel} (лайт-ответ API) в унифицированный {@link VideoLiteModel}.
 */
export function mapToVideoLite(raw: VideoLiteOutModel): VideoLiteModel {
	return {
		id: raw.id,
		type: mapType(raw.type),
		name: extractString(raw.name),
		languageCode: extractString(raw.languageCode) as LanguageCode,
		proficiencyLevel: mapProficiencyLevel((raw as unknown as Record<string, unknown>).proficiencyLevel),
		youtubeVideoId: extractString(raw.youtubeVideoId),
		about: extractString(raw.about),
		originalContent: extractString(raw.originalContent),
		processedContent: extractString(raw.processedContent),
		contentType: mapContentType(raw.contentType),
		fileName: extractString(raw.fileName),
		fileS3Key: extractString(raw.fileS3Key),
		fileUrl: extractString(raw.fileUrl),
		isFileUploaded: extractBoolean(raw.isFileUploaded),
		fileSizeMb: extractNumber(raw.fileSizeMb),
		duration: raw.durationSec ? formatDurationSec(raw.durationSec) : null,
		fileDurationSec: extractNumber(raw.fileDurationSec),
		userId: extractNumber(raw.userId),
		coverFileName: extractString(raw.coverFileName),
		coverFileS3Key: extractString(raw.coverFileS3Key),
		isCoverFileUploaded: extractBoolean(raw.isCoverFileUploaded) ?? false,
		coverUrl: extractString(raw.coverUrl),
		uploadCoverUrl: extractString(raw.uploadCoverUrl),
		subtitlesSource: mapSubtitlesSource(extractString(raw.subtitlesSource)),
		subtitlesStatus: raw.subtitlesStatus as SubtitlesStatusModelType,
		subtitlesErrorCode: extractString(raw.subtitlesErrorCode) ?? null,
		ratio: null,
	}
}

/**
 * Маппит {@link VideoOutModel} (полный ответ API) в унифицированный {@link VideoModel}.
 * Использует {@link mapToVideoLite} для базовых полей и дополняет populated-предложениями
 * и субтитрами через {@link createPopulatedPlainText} и {@link createPopulatedSubtitles}.
 */
export function mapVideoOutModelToVideoModel(raw: VideoOutModel): VideoModel {
	return {
		...mapToVideoLite(raw),
		ratio: extractString(raw.ratio) ?? null,
		plainSentences: createPopulatedPlainText(raw),
		subtitles: createPopulatedSubtitles(raw),
	}
}

// ─── Populated-текст ─────────────────────────────────────────────────────────

/**
 * Создаёт populated-предложения (plainSentences) из сырых данных VideoOutModel.
 */
export function createPopulatedPlainText(videoData: VideoOutModel): SentenceModel[] {
	if (!videoData.processedContent || !videoData.sentences) {
		return []
	}

	const text = videoData.processedContent as unknown as string
	const sortedSentences = [...videoData.sentences].sort((a, b) => a.orderIndex - b.orderIndex)

	return mapVideoSentencesToModels(text, sortedSentences as unknown as Record<string, unknown>[]) ?? []
}

/**
 * Создаёт populated-субтитры (subtitles) из сырых данных VideoOutModel.
 */
export function createPopulatedSubtitles(videoData: VideoOutModel): VideoSubtitlesModel.Structure {
	if (
		!videoData.processedContent ||
		!videoData.sentences ||
		!videoData.subtitles ||
		!videoData.subtitleSentenceInit
	) {
		return {
			subtitles: [],
			sentences: [],
			playingSubtitleOrSpeechlessBarId: 0,
		}
	}

	const text = videoData.processedContent as unknown as string
	const sentencesSorted = [...videoData.sentences].sort((a, b) => a.orderIndex - b.orderIndex)
	const subtitlesSorted = [...videoData.subtitles].sort((a, b) => a.orderIndex - b.orderIndex)

	const sentences: SentenceModel[] =
		mapVideoSentencesToModels(text, sentencesSorted as unknown as Record<string, unknown>[]) ?? []

	type InitItem = NonNullable<VideoOutModel['subtitleSentenceInit']>[number]

	const initBySubtitleId = new Map<number, InitItem[]>()
	for (const init of videoData.subtitleSentenceInit) {
		const arr = initBySubtitleId.get(init.subtitleId) ?? []
		arr.push(init)
		initBySubtitleId.set(init.subtitleId, arr)
	}

	const subtitles: VideoSubtitlesModel.Structure['subtitles'] = []
	let speechlessBarId = 10_000_000
	let prevEndMs = 0
	const wordOffsetBySentenceId = new Map<number, number>()

	for (const subtitle of subtitlesSorted) {
		const fromMs = subtitle.startTimeMs
		const toMs = subtitle.endTimeMs

		if (fromMs > prevEndMs) {
			subtitles.push({
				type: 'speechlessBar',
				id: speechlessBarId++,
				fromSeconds: prevEndMs / 1000,
				toSeconds: fromMs / 1000,
			})
		}

		const initItems = [...(initBySubtitleId.get(subtitle.id) ?? [])].sort((a, b) => a.startOffset - b.startOffset)
		const texts: VideoSubtitlesModel.Subtitle['texts'] = []
		let lastEnd = -1

		for (const init of initItems) {
			const start = Math.max(0, Math.min(text.length, init.startOffset))
			const end = Math.max(start, Math.min(text.length, init.startOffset + init.length))
			const fragment = text.slice(start, end)
			const currentWordOffset = wordOffsetBySentenceId.get(init.sentenceId) ?? 0

			const prev = texts[texts.length - 1]
			if (prev && prev.sentenceId === init.sentenceId && start <= lastEnd) {
				prev.text += fragment
			} else if (prev && prev.sentenceId === init.sentenceId && start === lastEnd) {
				prev.text += fragment
			} else {
				texts.push({ text: fragment, sentenceId: init.sentenceId, wordOffset: currentWordOffset })
			}

			wordOffsetBySentenceId.set(init.sentenceId, currentWordOffset + countWords(fragment))

			lastEnd = Math.max(lastEnd, end)
		}

		subtitles.push({
			type: 'subtitle',
			id: subtitle.id,
			from: msToTimeCode(fromMs),
			fromSeconds: fromMs / 1000,
			to: msToTimeCode(toMs),
			toSeconds: toMs / 1000,
			texts,
		})

		prevEndMs = Math.max(prevEndMs, toMs)
	}

	return {
		subtitles,
		sentences,
		playingSubtitleOrSpeechlessBarId: 0,
	}
}

// ─── Приватные хелперы ───────────────────────────────────────────────────────

function msToTimeCode(ms: number): string {
	const total = Math.max(0, Math.floor(ms))
	const hours = Math.floor(total / 3_600_000)
	const minutes = Math.floor((total % 3_600_000) / 60_000)
	const seconds = Math.floor((total % 60_000) / 1_000)
	const millis = total % 1_000

	const hh = String(hours).padStart(2, '0')
	const mm = String(minutes).padStart(2, '0')
	const ss = String(seconds).padStart(2, '0')
	const mmm = String(millis).padStart(3, '0')

	return `${hh}:${mm}:${ss},${mmm}`
}

function countWords(text: string): number {
	return getSentenceStructure(text).filter((p) => p.isWord).length
}

// ─── Общие мапперы полей ─────────────────────────────────────────────────────

export function mapType(raw: string): VideoLiteModel['type'] {
	return raw === 'public' || raw === 'private' ? raw : 'private'
}

export function mapContentType(raw: string): VideoContentType {
	return raw === 'subtitles' ? 'subtitles' : 'text'
}

export function mapSubtitlesSource(raw: null | string): null | SubtitlesSourceModelType {
	if (raw === 'user' || raw === 'youTube' || raw === 'llm') return raw
	return null
}

const PROFICIENCY_MAP: Record<number, 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'> = {
	1: 'A1',
	2: 'A2',
	3: 'B1',
	4: 'B2',
	5: 'C1',
	6: 'C2',
}

export function mapProficiencyLevel(raw: unknown): null | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' {
	if (typeof raw !== 'number' || raw < 1 || raw > 6) return null
	return PROFICIENCY_MAP[raw] ?? null
}
