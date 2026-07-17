import { useState, useEffect, useCallback } from 'react'
import { resolveError } from '@/shared/utils/resolveError'

type FetchState<T> = {
	loading: boolean
	error: null | string
	data: null | T
}

/**
 * Универсальный хук для получения данных из асинхронной функции.
 *
 * Оборачивает переданный fetcher, отслеживает состояние загрузки
 * и обрабатывает ошибки через {@link resolveError}.
 *
 * @param fetcher — асинхронная функция, возвращающая данные.
 * @param deps — зависимости, при изменении которых хук перезапрашивает данные.
 *               По умолчанию запрос выполняется один раз при монтировании.
 *
 * @example
 * ```ts
 * const { loading, error, data } = useFetchData(
 *   () => booksApi.getBooks(),
 *   [booksApi],
 * )
 * ```
 */
export function useFetchData<T>(fetcher: () => Promise<T>, deps: unknown[] = []): FetchState<T> {
	const [state, setState] = useState<FetchState<T>>({
		loading: true,
		error: null,
		data: null,
	})

	const fetch = useCallback(
		async function () {
			setState({ loading: true, error: null, data: null })

			try {
				const data = await fetcher()
				setState({ loading: false, error: null, data })
			} catch (error) {
				setState({ loading: false, error: resolveError(error), data: null })
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		deps,
	)

	useEffect(
		function () {
			fetch()
		},
		[fetch],
	)

	return state
}
