import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type {
	// 	VideoContentType,
	VideoLiteModel,
	VideoModel,
	// 	VideoSubtitlesModel,
	// 	SubtitlesSourceModelType,
	// 	SubtitlesStatusModelType,
	SubtitlesStatusModel,
} from '../lib/types'

// Реэкспорт общих типов для обратной совместимости
export type {
	// 	VideoContentType,
	VideoLiteModel,
	VideoModel,
	// 	VideoSubtitlesModel,
	// 	SubtitlesSourceModelType,
	// 	SubtitlesStatusModelType,
	SubtitlesStatusModel,
}

// ─── Специфичные типы для CRUD-операций с видео ──────────────────────────────

/**
 * Унифицированный тип для создания видео.
 */
export type CreateVideoInput = {
	name: null | string
	originalContent: null | string
	fileSizeMb: null | number
	durationSec: null | number
	languageCode: string
}

/**
 * Унифицированный тип для обновления видео.
 */
export type UpdateVideoInput = {
	name?: null | string
	originalContent?: null | string
	languageCode?: string
	fileName?: null | string
	fileMimeType?: null | string
	isFileUploaded?: null | boolean
	fileSizeMb?: null | number
	fileDurationSec?: null | number
	coverFileName?: null | string
	coverFileMimeType?: null | string
	isCoverFileUploaded?: null | boolean
}

// ─── Интерфейс репозитория ───────────────────────────────────────────────────

/**
 * Репозиторий видео — абстракция над серверным API.
 * Компоненты зависят от этого интерфейса, а не от конкретной реализации.
 *
 * Каждый метод возвращает Promise с данными. В случае ошибки
 * выбрасывает исключение, которое {@link resolveError} преобразует
 * в читаемый текст.
 */
export type VideosRepository = {
	/** Получить все видео (публичные + приватные пользователя) */
	getVideos(): Promise<ApiResult<VideoLiteModel[]>>

	/** Получить видео по ID с полной информацией */
	getVideo(id: string | number): Promise<ApiResult<VideoModel>>

	/** Создать приватное видео */
	createVideo(input: CreateVideoInput): Promise<ApiResult<VideoLiteModel>>

	/** Обновить приватное видео */
	updateVideo(id: number, input: UpdateVideoInput): Promise<ApiResult<VideoLiteModel>>

	/** Удалить приватное видео */
	deleteVideo(id: number): Promise<ApiResult<void>>

	/** Запустить генерацию субтитров для загруженного видео */
	generateSubtitles(id: number): Promise<ApiResult<SubtitlesStatusModel>>

	/** Получить статус генерации субтитров */
	getSubtitlesStatus(id: number): Promise<ApiResult<SubtitlesStatusModel>>
}
