import { useState, useCallback } from 'react'
import type { ApiResult, FieldError } from '@/shared/utils/fetchData/executeApiCall'

type MutationState<TInput, TOutput> = {
	loading: boolean
	error: null | string
	errors: null | FieldError[]
	data: null | TOutput
	mutate: (input: TInput) => Promise<ApiResult<TOutput>>
	reset: () => void
}

/**
 * Хук для действий, которые вызываются по событию (клик, submit и т.д.).
 * В отличие от {@link useFetchData}, НЕ запускает запрос автоматически —
 * запрос происходит только при вызове `mutate(input)`.
 *
 * Мутатор (метод репозитория) возвращает {@link ApiResult} —
 * ошибки не выбрасываются, а возвращаются в объекте результата.
 *
 * @param mutator — метод репозитория, возвращающий {@link ApiResult}.
 *
 * @example
 * ```ts
 * const { loading, error, errors, mutate } = useAsyncMutation(
 *   (input: CreateBookInput) => booksApi.createBook(input),
 * )
 *
 * const handleClick = async () => {
 *   const result = await mutate({ name: 'Новая книга', languageCode: 'en' })
 *   if (result.data) {
 *     router.push(`/books/${result.data.id}`)
 *   }
 * }
 * ```
 */
export function useAsyncMutation<TInput, TOutput>(
	mutator: (input: TInput) => Promise<ApiResult<TOutput>>,
): MutationState<TInput, TOutput> {
	const [state, setState] = useState<{
		loading: boolean
		error: null | string
		errors: null | FieldError[]
		data: null | TOutput
	}>({
		loading: false,
		error: null,
		errors: null,
		data: null,
	})

	const mutate = useCallback(
		async function (input: TInput): Promise<ApiResult<TOutput>> {
			setState({ loading: true, error: null, errors: null, data: null })

			const result = await mutator(input)

			setState({
				loading: false,
				error: result.error,
				errors: result.errors,
				data: result.error || result.errors ? null : result.data,
			})
			return result
		},
		[mutator],
	)

	const reset = useCallback(function () {
		setState({ loading: false, error: null, errors: null, data: null })
	}, [])

	return {
		loading: state.loading,
		error: state.error,
		errors: state.errors,
		data: state.data,
		mutate,
		reset,
	}
}
