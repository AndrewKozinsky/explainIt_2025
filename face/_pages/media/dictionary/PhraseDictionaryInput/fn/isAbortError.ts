/**
 * Проверяет, является ли ошибка ожидаемым AbortError —
 * когда пользователь быстро переключает слова и предыдущий запрос отменяется.
 */
export function isAbortError(error: unknown): boolean {
	if (error instanceof DOMException && error.name === 'AbortError') {
		return true
	}

	return false
}
