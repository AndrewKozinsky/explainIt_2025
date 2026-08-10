// import { queryOptions } from '@tanstack/react-query'
// import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
// import { languagesService, type LanguagesService } from './LanguagesService'

/**
 * Ключи кэша серверных данных языков.
 *
 * Префикс `all` позволяет инвалидировать все запросы языков одной командой,
 * если в будущем появится механика обновления списка языков.
 */
/*export const languageQueryKeys = {
	all: ['languages'] as const,
	list: () => [...languageQueryKeys.all, 'list'] as const,
}*/

/**
 * Адаптер между доменным сервисом и TanStack Query.
 *
 * В кэш попадают `LanguageModel`, а не DTO OpenAPI: все источники данных
 * продолжают соответствовать контракту `LanguagesRepository`.
 */
/*export class LanguagesQueryFacade {
	constructor(private readonly service: LanguagesService) {}

	getLanguages() {
		return queryOptions({
			queryKey: languageQueryKeys.list(),
			queryFn: () => unwrapApiResult(this.service.getLanguages()),
			staleTime: Infinity, // языки не меняются в рамках сессии
		})
	}
}*/

/** Готовый экземпляр фасада */
// export const languageQueries = new LanguagesQueryFacade(languagesService)
