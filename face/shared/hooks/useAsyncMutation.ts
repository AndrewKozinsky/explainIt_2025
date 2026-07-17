import { useState, useCallback } from 'react'
import { resolveError } from '@/shared/utils/resolveError'

type MutationState<TInput, TOutput> = {
	loading: boolean
	error: null | string
	data: null | TOutput
	mutate: (input: TInput) => Promise<null | TOutput>
	reset: () => void
}

/**
 * Хук для действий, которые вызываются по событию (клик, submit и т.д.).
 * В отличие от {@link useFetchData}, НЕ запускает запрос автоматически —
 * запрос происходит только при вызове `mutate(input)`.
 *
 * Ошибки обрабатываются через {@link resolveError} и попадают в `error`.
 *
 * @param mutator — асинхронная функция, принимающая входные данные.
 *
 * @example
 * ```ts
 * const { loading, error, mutate } = useAsyncMutation(
 *   (input: CreateBookInput) => booksApi.createBook(input),
 * )
 *
 * const handleClick = async () => {
 *   const book = await mutate({ name: 'Новая книга', languageCode: 'en' })
 *   if (book) {
 *     router.push(`/books/${book.id}`)
 *   }
 * }
 * ```
 */
export function useAsyncMutation<TInput, TOutput>(
	mutator: (input: TInput) => Promise<TOutput>,
): MutationState<TInput, TOutput> {
	const [state, setState] = useState<{
		loading: boolean
		error: null | string
		data: null | TOutput
	}>({
		loading: false,
		error: null,
		data: null,
	})

	const mutate = useCallback(
		async function (input: TInput): Promise<null | TOutput> {
			setState({ loading: true, error: null, data: null })

			try {
				const result = await mutator(input)
				setState({ loading: false, error: null, data: result })
				return result
			} catch (error) {
				const errorText = resolveError(error)
				setState({ loading: false, error: errorText, data: null })
				return null
			}
		},
		[mutator],
	)

	const reset = useCallback(function () {
		setState({ loading: false, error: null, data: null })
	}, [])

	return {
		loading: state.loading,
		error: state.error,
		data: state.data,
		mutate,
		reset,
	}
}
