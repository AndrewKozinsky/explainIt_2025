import type { SentenceModel } from '@/entities/media/repository/SentenceTypes'
import { ProficiencyLevel } from '@/shared/api/ff'
import type { LanguageCode } from '@/shared/utils/languages'

// ─── Типы из Prisma (server/prisma/schema.prisma) ────────────────────────────

/** Video.content_type: VideoTextType */
export type VideoContentType = 'text' | 'subtitles'

/** Video.subtitles_source: SubtitlesSource */
export type SubtitlesSourceModelType = 'user' | 'youTube' | 'llm'

/** Video.subtitles_status: SubtitlesStatus */
export type SubtitlesStatusModelType = 'idle' | 'pending' | 'processing' | 'done' | 'failed'

// ─── Модель субтитров ────────────────────────────────────────────────────────

/**
 * Структура populated-текста для субтитров.
 */
export namespace VideoSubtitlesModel {
	export type Structure = {
		subtitles: (Subtitle | SpeechlessBar)[]
		sentences: SentenceModel[]
		/** Идентификатор проигрываемого субтитра или паузы (speechlessBar) */
		playingSubtitleOrSpeechlessBarId: number
	}

	/** Полоса между диалогами */
	export type SpeechlessBar = {
		type: 'speechlessBar'
		id: number
		/** Start time in seconds */
		fromSeconds: number
		/** End time in seconds */
		toSeconds: number
	}

	export type Subtitle = {
		type: 'subtitle'
		id: number
		/** Start time (00:00:01,000) */
		from: string
		/** Start time in seconds */
		fromSeconds: number
		/** End time (00:00:02,000) */
		to: string
		/** End time in seconds */
		toSeconds: number
		/** Texts */
		texts: {
			text: string
			sentenceId: number
			wordOffset: number
		}[]
	}
}

// ─── Модели видео ────────────────────────────────────────────────────────────

/**
 * Унифицированный тип видео (лайт-версия, для списка).
 * Компоненты работают только с этим типом — он не зависит от API.
 */
export type VideoLiteModel = {
	id: number
	type: 'public' | 'private'
	name: null | string
	languageCode: LanguageCode
	/** Уровень владения языком: A1, A2, B1, B2, C1, C2 (сервер присылает числа 1–6) */
	proficiencyLevel: null | ProficiencyLevel
	youtubeVideoId: null | string
	about: null | string
	topic: null | string
	originalContent: null | string
	processedContent: null | string
	contentType: VideoContentType
	fileName: null | string
	fileS3Key: null | string
	fileUrl: null | string
	isFileUploaded: null | boolean
	fileSizeMb: null | number
	duration: null | string
	durationSeconds: number
	ratio: null | string
	userId: null | number
	coverFileName: null | string
	coverFileS3Key: null | string
	isCoverFileUploaded: boolean
	coverUrl: null | string
	uploadCoverUrl: null | string
	subtitlesSource: null | SubtitlesSourceModelType
	subtitlesStatus: SubtitlesStatusModelType
	subtitlesErrorCode: null | string
}

/**
 * Унифицированный тип видео (полная версия, с субтитрами и предложениями).
 */
export type VideoModel = VideoLiteModel & {
	plainSentences: null | SentenceModel[]
	subtitles: null | VideoSubtitlesModel.Structure
}

/**
 * Статус генерации субтитров.
 */
export type SubtitlesStatusModel = {
	videoId: number
	source: null | SubtitlesSourceModelType
	status: null | SubtitlesStatusModelType
	errorCode: null | string
	jobId: null | string
}
