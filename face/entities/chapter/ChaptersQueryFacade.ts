import { queryOptions } from '@tanstack/react-query'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { chaptersService } from './ChaptersService'
import type { ChaptersService } from './ChaptersService'

/**
 * Ключи кэша серверных данных глав.
 */
export const chapterQueryKeys = {
	all: ['chapters'] as const,
	detail: (id: number) => [...chapterQueryKeys.all, 'detail', id] as const,
}

/**
 * Адаптер между доменным сервисом и TanStack Query.
 *
 * В кэш попадают {@link BookChapterModel}, а не DTO OpenAPI: все источники данных
 * продолжают соответствовать контракту {@link ChaptersRepository}.
 */
export class ChaptersQueryFacade {
	constructor(private readonly service: ChaptersService) {}

	getChapter(id: number) {
		return queryOptions({
			queryKey: chapterQueryKeys.detail(id),
			queryFn: () => unwrapApiResult(this.service.getChapter(id)),
		})
	}
}

/** Готовый экземпляр фасада */
export const chaptersQueries = new ChaptersQueryFacade(chaptersService)
