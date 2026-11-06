import { ApiError } from '@/shared/api/mutator'
import { type ServerErrorParams, translateServerError } from './serverErrorTexts'

/**
 * Извлекает код ошибки из тела ответа сервера и возвращает
 * читаемый текст ошибки на языке интерфейса (locale).
 *
 * ## Формат ошибок сервера
 *
 * **CustomError** (бизнес-ошибки):
 * ```
 * { message: { code: 'BOOK_NOT_FOUND' }, statusCode: 404 }
 * { message: '{"code":"BOOK_NOT_FOUND"}', code: 'NOT_FOUND', statusCode: 404 }
 * ```
 * `message` — объект с кодом или JSON-строка с ним. Код переводится
 * через `translateServerError` (messages/{locale}/serverErrors.json).
 *
 * **HttpException** (валидация, HTTP-ошибки):
 * ```
 * { message: '...', statusCode: 400 }
 * ```
 * Без кода — возвращается текст UNKNOWN_ERROR.
 *
 * @param error — ошибка, выброшенная mutator'ом (ApiError) или любая другая.
 * @param locale — язык интерфейса; null — английский.
 */
export function resolveError(error: unknown, locale: null | string): string {
	if (error instanceof ApiError) {
		const code = extractErrorCode(error.body)
		if (code) {
			return resolveErrorByCode(code, getErrorParamsSource(error.body), locale)
		}
	}

	return translateServerError('UNKNOWN_ERROR', {}, locale)
}

/** Текст ошибки по коду; параметры текста (fieldName, minNumber…) берутся из тела ошибки */
export function resolveErrorByCode(code: string, body: unknown, locale: null | string): string {
	const params: ServerErrorParams = typeof body === 'object' && body !== null ? (body as ServerErrorParams) : {}

	return translateServerError(code, params, locale)
}

// ─── Приватные ──────────────────────────────────────────────────────────────

/** Параметры текста лежат рядом с кодом: в объекте message или, для JSON-строки, в корне тела ответа */
function getErrorParamsSource(body: unknown): unknown {
	const message = (body as Record<string, unknown>).message

	return typeof message === 'object' && message !== null ? message : body
}

function extractErrorCode(body: unknown): null | string {
	if (typeof body !== 'object' || body === null) return null

	const bodyObj = body as Record<string, unknown>

	const message = bodyObj.message

	// CustomError: message — объект вида { code: 'BOOK_NOT_FOUND' }
	if (typeof message === 'object' && message !== null) {
		const code = (message as Record<string, unknown>).code

		return typeof code === 'string' ? code : null
	}

	// CustomError: message — JSON-строка вида '{"code":"BOOK_NOT_FOUND"}'
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
