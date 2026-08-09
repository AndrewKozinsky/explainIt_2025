import { ApiError } from '@/shared/api/mutator'
import { serverErrorMessagesByCode, errorMessages, ServerErrorMessage } from './errorMessages'

/**
 * Извлекает код ошибки из тела ответа сервера и возвращает
 * читаемый текст ошибки на русском языке.
 *
 * ## Формат ошибок сервера
 *
 * **CustomError** (бизнес-ошибки):
 * ```
 * { message: '{"code":"BOOK_NOT_FOUND"}', code: 'NOT_FOUND', statusCode: 404 }
 * ```
 * `message` — JSON-строка с `errorMessageCode`. Код резолвится
 * через `serverErrorMessagesByCode` в читаемый текст.
 *
 * **HttpException** (валидация, HTTP-ошибки):
 * ```
 * { message: '...', statusCode: 400 }
 * ```
 * Без `errorMessageCode` — возвращается `errorMessages.unknownServerError`.
 *
 * @param error — ошибка, выброшенная mutator'ом (ApiError) или любая другая.
 * @returns Читаемый текст ошибки на русском.
 */
export function resolveError(error: unknown): string {
	if (error instanceof ApiError) {
		const code = extractErrorCode(error.body)
		if (code) {
			return resolveErrorByCode(code, error.body)
		}
	}

	return errorMessages.unknownServerError
}

// ─── Приватные ──────────────────────────────────────────────────────────────

function extractErrorCode(body: unknown): null | string {
	if (typeof body !== 'object' || body === null) return null

	const bodyObj = body as Record<string, unknown>

	// CustomError: message — JSON-строка вида '{"code":"BOOK_NOT_FOUND"}'
	const message = bodyObj.message

	if (typeof message === 'string') {
		try {
			const parsed = JSON.parse(message)
			if (typeof parsed?.code === 'string') {
				return parsed.code
			}
		} catch {
			// message — не JSON, продолжаем
		}
	}

	return null
}

export function resolveErrorByCode(code: string, body: unknown): string {
	const resolver = serverErrorMessagesByCode[code]

	if (typeof resolver === 'string') return resolver

	if (typeof resolver === 'function') {
		// Резолверы типа MIN_CHARACTERS принимают ServerErrorMessage
		const errorMessage: ServerErrorMessage =
			typeof body === 'object' && body !== null
				? (body as ServerErrorMessage)
				: ({ errorMessageCode: code } as unknown as ServerErrorMessage)
		return resolver(errorMessage)
	}

	return errorMessages.unknownServerError
}
