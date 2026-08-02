import type { VideoModel } from '@/entites/videos/repository/VideosRepository'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import type {
	GetYoutubeVideosParams,
	YoutubeRepository,
	YoutubeVideosResultModel,
} from './repository/YoutubeRepository'

export type {
	GetYoutubeVideosParams,
	YoutubeVideoModel,
	YoutubeVideosResultModel,
} from './repository/YoutubeRepository'

/**
 * Сервис YouTube — прослойка между компонентами и репозиторием.
 *
 * Принимает {@link YoutubeRepository} в конструкторе, что позволяет
 * подменять источник данных:
 * - `new YoutubeApi()` — реальный API в продакшене
 * - мок-объект — в тестах и Storybook
 *
 * Компоненты зависят от этого сервиса, а не от конкретной реализации API.
 */
export class YoutubeService {
	private youtubeRepository: YoutubeRepository

	constructor(youtubeRepository: YoutubeRepository) {
		this.youtubeRepository = youtubeRepository
	}

	/** Получить список видео с YouTube по языку и поисковому запросу */
	async getVideos(params: GetYoutubeVideosParams): Promise<ApiResult<YoutubeVideosResultModel>> {
		return this.youtubeRepository.getVideos(params)
	}

	/** Получить данные одного видео с YouTube по его ID */
	async getVideoById(videoId: string): Promise<ApiResult<null | VideoModel>> {
		return this.youtubeRepository.getVideoById(videoId)
	}

	/** Сохранить YouTube-видео в БД для привязки субтитров и переводов */
	async getOrCreateVideo(videoId: string): Promise<ApiResult<VideoModel>> {
		return this.youtubeRepository.getOrCreateVideo(videoId)
	}
}
