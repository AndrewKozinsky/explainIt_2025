import { resolveError } from '@/shared/utils/resolveError'

type FetchDataResult<T> = {
	error: null | string
	data: null | T
}

/**
 * Обёртка для получения данных в серверных компонентах, где хуки
 * использовать нельзя.
 *
 * В отличие от {@link useFetchData}, это обычная асинхронная функция:
 * - Нет состояния `loading` — серверный компонент рендерится только
 *   после завершения запроса
 * - Не использует React-хуки — можно вызывать в Server Components
 * - Ошибки обрабатываются через тот же {@link resolveError}
 *
 * @param fetcher — асинхронная функция, возвращающая данные.
 *
 * @example
 * ```ts
 * // app/[locale]/books/page.tsx (Server Component)
 * export default async function BooksPage() {
 *     const api = new BooksApi()
 *     const { error, data } = await fetchData(() => api.getBooks())
 *
 *     if (error) return <ErrorMessage text={error} />
 *     return <BooksList books={data} />
 * }
 * ```
 */
export async function fetchData<T>(fetcher: () => Promise<T>): Promise<FetchDataResult<T>> {
	try {
		const data = await fetcher()
		return { error: null, data }
	} catch (error) {
		return { error: resolveError(error), data: null }
	}
}
