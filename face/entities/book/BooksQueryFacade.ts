import { queryOptions } from '@tanstack/react-query'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { booksService } from './BooksService'
import type { BooksService } from './BooksService'

/**
 * Ключи кэша серверных данных книг.
 */
export const booksQueryKeys = {
	all: ['books'] as const,
	list: () => [...booksQueryKeys.all, 'list'] as const,
}

/**
 * Адаптер между доменным сервисом и TanStack Query.
 *
 * В кэш попадают {@link BookModel}, а не DTO OpenAPI: все источники данных
 * продолжают соответствовать контракту {@link BooksRepository}.
 */
export class BooksQueryFacade {
	constructor(private readonly service: BooksService) {}

	getBooks() {
		return queryOptions({
			queryKey: booksQueryKeys.list(),
			queryFn: () => unwrapApiResult(this.service.getBooks()),
		})
	}
}

export const booksQueries = new BooksQueryFacade(booksService)
