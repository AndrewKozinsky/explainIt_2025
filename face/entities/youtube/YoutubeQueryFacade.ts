import { queryOptions } from '@tanstack/react-query'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { youtubeService, YoutubeService } from './YoutubeService'

/**
 * Ключи кэша серверных данных YouTube.
 *
 * Префикс `all` позволяет инвалидировать все запросы YouTube одной командой.
 */
export const youtubeQueryKeys = {
	all: ['youtube'] as const,
	topics: () => [...youtubeQueryKeys.all, 'topics'] as const,
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
}

/** Готовый экземпляр фасада */
export const youtubeQueries = new YoutubeQueryFacade(youtubeService)
