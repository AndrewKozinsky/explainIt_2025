import { queryOptions, type QueryClient } from '@tanstack/react-query'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { videosService } from './VideosService'
import type { CreateVideoInput } from './repository/VideosRepository'
import type { VideosService as VideosServiceType } from './VideosService'

/**
 * Ключи кэша серверных данных видео.
 *
 * Префикс `all` позволяет инвалидировать все запросы видео одной командой.
 */
export const videoQueryKeys = {
	all: ['videos'] as const,
	list: () => [...videoQueryKeys.all, 'list'] as const,
	detail: (id: number) => [...videoQueryKeys.all, 'detail', id] as const,
}

/**
 * Адаптер между доменным сервисом и TanStack Query.
 *
 * В кэш попадают доменные модели, а не DTO OpenAPI: все источники данных
 * продолжают соответствовать контракту {@link VideosRepository}.
 */
export class VideosQueryFacade {
	constructor(private readonly service: VideosServiceType) {}

	getVideos() {
		return queryOptions({
			queryKey: videoQueryKeys.list(),
			queryFn: () => unwrapApiResult(this.service.getVideos()),
		})
	}

	getVideo(id: number) {
		return queryOptions({
			queryKey: videoQueryKeys.detail(id),
			queryFn: () => unwrapApiResult(this.service.getVideo(id)),
		})
	}

	createVideo(queryClient: QueryClient) {
		return {
			mutationFn: (input: CreateVideoInput) => unwrapApiResult(this.service.createVideo(input)),
			onSuccess: () => queryClient.invalidateQueries({ queryKey: videoQueryKeys.all }),
		}
	}
}

/** Готовый экземпляр фасада */
export const videoQueries = new VideosQueryFacade(videosService)
