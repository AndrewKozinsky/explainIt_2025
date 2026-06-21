import { ApolloError } from '@apollo/client'

/**
 * Проверяет, является ли ошибка ожидаемым AbortError —
 * когда пользователь быстро переключает слова и предыдущий запрос отменяется.
 *
 * Apollo оборачивает DOMException('AbortError') в свой ApolloError,
 * поэтому проверяем оба варианта.
 */
export function isAbortError(error: unknown): boolean {
	if (error instanceof DOMException && error.name === 'AbortError') {
		return true
	}

	if (error instanceof ApolloError && error.networkError?.name === 'AbortError') {
		return true
	}

	return false
}
