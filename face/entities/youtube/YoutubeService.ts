import type { VideoLiteModel } from '@/entities/video/lib/types'
import type { VideoModel } from '@/entities/video/repository/VideosRepository'
import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'
import { YoutubeApi } from './repository/YoutubeApi'
import type {
	GetSavedYoutubeVideosParams,
	GetYoutubeVideosParams,
	YoutubeRepository,
	YoutubeVideosResultModel,
} from './repository/YoutubeRepository'

export type {
	GetSavedYoutubeVideosParams,
	GetYoutubeVideosParams,
	YoutubeVideoModel,
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
		return this.youtubeRepository.searchYouTubeVideos(params)
	}

	/** Сохранить YouTube-видео в БД для привязки субтитров и переводов */
	async getOrCreateVideo(videoId: string): Promise<ApiResult<VideoModel>> {
		return this.youtubeRepository.getOrCreateYouTubeVideo(videoId)
	}

	/** Получить сохранённые YouTube-видео с фильтрами */
	async getSavedVideos(params?: GetSavedYoutubeVideosParams): Promise<ApiResult<VideoLiteModel[]>> {
		return this.youtubeRepository.getSavedVideos(params)
	}

	/** Получить список категорий (тем) видео */
	async getVideoTopics(): Promise<ApiResult<string[]>> {
		return this.youtubeRepository.getVideoTopics()
	}
}

/** Готовый экземпляр сервиса с реальным API */
export const youtubeService = new YoutubeService(new YoutubeApi())
