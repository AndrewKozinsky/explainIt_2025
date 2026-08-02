import type { VideoModel } from '@/entites/videoBase/repository/BaseVideosRepository'
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
}

/** Параметры запроса списка видео. */
export type GetYoutubeVideosParams = {
	query: string
	limit?: number
	pageToken?: string
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
	getVideos(params: GetYoutubeVideosParams): Promise<ApiResult<YoutubeVideosResultModel>>
	/** Получить данные одного видео с YouTube по его ID */
	getVideoById(videoId: string): Promise<ApiResult<null | VideoModel>>
	/** Сохранить YouTube-видео в БД для привязки субтитров и переводов */
	getOrCreateVideo(videoId: string): Promise<ApiResult<VideoModel>>
}
