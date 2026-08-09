import type { ApiResult } from '@/shared/utils/fetchData/executeApiCall'

/**
 * Адаптер между {@link ApiResult} и моделью ошибок TanStack Query.
 *
 * ApiResult возвращает `{ data, error, errors }` — ошибки лежат в данных,
 * а не выбрасываются. React Query (и queryFn внутри queryOptions) ожидает,
 * что функция либо вернёт `T`, либо выбросит исключение.
 *
 * Эта функция делает преобразование: при наличии `error` или `errors`
 * выбрасывает `Error`, иначе возвращает `data`.
 */
export async function unwrapApiResult<T>(request: Promise<ApiResult<T>>): Promise<T> {
	const result = await request

	if (result.error) {
		throw new Error(result.error)
	}

	if (result.errors) {
		throw new Error(result.errors.flatMap((fieldError) => fieldError.messages).join(' '))
	}

	return result.data
}
