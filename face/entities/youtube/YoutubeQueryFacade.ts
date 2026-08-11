import { queryOptions } from '@tanstack/react-query'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { youtubeService, YoutubeService } from './YoutubeService'
import type { GetSavedYoutubeVideosParams } from './repository/YoutubeRepository'

/**
 * Ключи кэша серверных данных YouTube.
 *
 * Префикс `all` позволяет инвалидировать все запросы YouTube одной командой.
 */
export const youtubeQueryKeys = {
	all: ['youtube'] as const,
	topics: () => [...youtubeQueryKeys.all, 'topics'] as const,
	savedVideos: (params: GetSavedYoutubeVideosParams) => [...youtubeQueryKeys.all, 'savedVideos', params] as const,
}

/**
 * Адаптер между доменным сервисом и TanStack Query.
 */
export class YoutubeQueryFacade {
	constructor(private readonly service: YoutubeService) {}

	getVideoTopics() {
		return queryOptions({
			queryKey: youtubeQueryKeys.topics(),
			queryFn: () => unwrapApiResult(this.service.getVideoTopics()),
		})
	}

	getSavedVideos(params: GetSavedYoutubeVideosParams) {
		return queryOptions({
			queryKey: youtubeQueryKeys.savedVideos(params),
			queryFn: () => unwrapApiResult(this.service.getSavedVideos(params)),
		})
	}
}

/** Готовый экземпляр фасада */
export const youtubeQueries = new YoutubeQueryFacade(youtubeService)
