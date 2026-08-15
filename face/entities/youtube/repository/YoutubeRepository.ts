import type { VideoLiteModel, VideoModel } from '@/entities/video/lib/types'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'

/** Унифицированный тип результата поиска видео. */
export type YoutubeVideosResultModel = {
	videos: YoutubeVideoModel[]
	nextPageToken: null | string
	totalResults: number
}

/**
 * Унифицированный тип YouTube-видео.
 * Компоненты работают только с этим типом — он не зависит от API.
 */
export type YoutubeVideoModel = {
	videoId: string
	title: string
	channelName: string
	channelLogoUrl: null | string
	thumbnailUrl: string
	viewCount: number
	duration: string
	durationSeconds: number
}

/** Параметры запроса списка видео. */
export type GetYoutubeVideosParams = {
	query: string
	limit?: number
	pageToken?: string
}

/** Параметры запроса сохранённых видео. */
export type GetSavedYoutubeVideosParams = {
	page?: number
	pageSize?: number
	maxDurationSec?: number
	minDurationSec?: number
	proficiencyLevel?: number
	topic?: string
	languageCode?: string
	sortBy?: 'created_at' | 'learnability_score'
	sortDirection?: 'asc' | 'desc'
}

/** Одна страница сохранённых видео вместе с метаданными пагинации. */
export type SavedVideosPage = {
	items: VideoLiteModel[]
	page: number
	pageSize: number
	total: number
	totalPages: number
}

/**
 * Репозиторий YouTube — абстракция над серверным API.
 * Компоненты зависят от этого интерфейса, а не от конкретной реализации.
 *
 * Каждый метод возвращает Promise с данными. В случае ошибки
 * выбрасывает исключение, которое {@link resolveError} преобразует
 * в читаемый текст.
 */
export type YoutubeRepository = {
	/** Получить список видео с YouTube по языку и поисковому запросу */
	searchYouTubeVideos(params: GetYoutubeVideosParams): Promise<ApiResult<YoutubeVideosResultModel>>
	/** Получить данные одного видео с YouTube по его ID */
	// getVideoById(videoId: string): Promise<ApiResult<null | VideoModel>>
	/** Сохранить YouTube-видео в БД для привязки субтитров и переводов */
	getOrCreateYouTubeVideo(videoId: string): Promise<ApiResult<VideoModel>>
	/** Получить сохранённые YouTube-видео с фильтрами */
	getSavedVideos(params?: GetSavedYoutubeVideosParams): Promise<ApiResult<SavedVideosPage>>
	/** Получить список категорий (тем) видео */
	getVideoTopics(): Promise<ApiResult<string[]>>
}
