import { infiniteQueryOptions, queryOptions, type QueryClient } from '@tanstack/react-query'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { youtubeService, YoutubeService } from './YoutubeService'
import type { GetSavedYoutubeVideosParams, GetYoutubeVideosParams } from './repository/YoutubeRepository'

/** Количество сохранённых видео на одной странице. */
const SAVED_VIDEOS_PAGE_SIZE = 12

/**
 * Ключи кэша серверных данных YouTube.
 *
 * Префикс `all` позволяет инвалидировать все запросы YouTube одной командой.
 */
export const youtubeQueryKeys = {
	all: ['youtube'] as const,
	topics: () => [...youtubeQueryKeys.all, 'topics'] as const,
	videos: (params: GetYoutubeVideosParams) => [...youtubeQueryKeys.all, 'videos', params] as const,
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

	getVideos(params: GetYoutubeVideosParams) {
		return queryOptions({
			queryKey: youtubeQueryKeys.videos(params),
			queryFn: () => unwrapApiResult(this.service.getVideos(params)),
		})
	}

	getSavedVideosInfinite(params: GetSavedYoutubeVideosParams) {
		return infiniteQueryOptions({
			queryKey: youtubeQueryKeys.savedVideos(params),
			initialPageParam: 1,
			queryFn: ({ pageParam }) =>
				unwrapApiResult(
					this.service.getSavedVideos({ ...params, page: pageParam, pageSize: SAVED_VIDEOS_PAGE_SIZE }),
				),
			getNextPageParam: (lastPage) => (lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined),
		})
	}

	getOrCreateVideo(queryClient: QueryClient) {
		return {
			mutationFn: (videoId: string) => unwrapApiResult(this.service.getOrCreateVideo(videoId)),
			onSuccess: () => queryClient.invalidateQueries({ queryKey: youtubeQueryKeys.all }),
		}
	}
}

/** Готовый экземпляр фасада */
export const youtubeQueries = new YoutubeQueryFacade(youtubeService)
