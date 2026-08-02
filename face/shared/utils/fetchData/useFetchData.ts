import { useState, useEffect, useCallback, useRef } from 'react'
import type { ApiResult, FieldError } from '@/shared/utils/fetchData/executeApiCall'

type Fetcher<T> = () => Promise<ApiResult<T>>

export type FetchState<T> = {
	loading: boolean
	error: null | string
	errors: null | FieldError[]
	data: null | T
}

export type UseFetchDataOptions = {
	enabled?: boolean
}

type FetchDataState<T> = FetchState<T> & {
	refetch: () => Promise<ApiResult<T>>
}

/**
 * Универсальный хук для получения данных из метода репозитория.
 *
 * Оборачивает переданный fetcher (метод репозитория, возвращающий
 * {@link ApiResult}), отслеживает состояние загрузки и пробрасывает
 * ошибки и данные.
 *
 * В отличие от серверного аналога, добавляет `loading` — состояние
 * загрузки, которое меняется во время выполнения запроса.
 *
 * @param fetcher — метод репозитория, возвращающий {@link ApiResult}.
 * @param deps — зависимости, при изменении которых хук перезапрашивает данные.
 *               По умолчанию запрос выполняется один раз при монтировании.
 * @param options — дополнительные настройки запроса.
 *                 `enabled: false` отключает автоматический запрос, оставляя
 *                 возможность запустить его через `refetch`.
 *
 * @example
 * ```ts
 * const api = useMemo(() => new BooksApi(), [])
 * const { loading, error, errors, data, refetch } = useFetchData(
 *   () => api.getBooks(),
 *   [api],
 * )
 *
 * if (loading) return <Loader />
 * if (error) return <Error text={error} />
 * if (errors) return <FieldErrors errors={errors} />
 * return <BooksList books={data} />
 * ```
 */
export function useFetchData<T>(
	fetcher: Fetcher<T>,
	deps: unknown[] = [],
	options: UseFetchDataOptions = {},
): FetchDataState<T> {
	const { enabled = true } = options

	const [state, setState] = useState<FetchState<T>>({
		loading: enabled,
		error: null,
		errors: null,
		data: null,
	})

	const execute = useCallback(
		async function (keepPreviousData: boolean) {
			setState((currentState) => ({
				loading: true,
				error: null,
				errors: null,
				data: keepPreviousData ? currentState.data : null,
			}))

			const result = await fetcher()

			setState((currentState) => ({
				loading: false,
				error: result.error,
				errors: result.errors,
				data: result.error || result.errors ? (keepPreviousData ? currentState.data : null) : result.data,
			}))

			return result
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		deps,
	)

	const refetch = useCallback(
		function () {
			return execute(true)
		},
		[execute],
	)

	const lastAutomaticFetch = useRef<null | typeof execute>(null)

	useEffect(
		function () {
			if (!enabled) {
				lastAutomaticFetch.current = null
				return
			}

			// Не дублируем автоматический запрос в React Strict Mode.
			if (lastAutomaticFetch.current === execute) return
			lastAutomaticFetch.current = execute
			void execute(false)
		},
		[enabled, execute],
	)

	return { ...state, refetch }
}
