import { ApiError } from '@/shared/api/mutator'
import { isAbortError } from '@/shared/utils/fetchData/isAbortError'
import { resolveError, resolveErrorByCode } from '@/shared/utils/fetchData/resolveError'

/**
 * Одна валидационная ошибка от сервера — поле и список сообщений.
 */
export type FieldError = {
	field: string
	messages: string[]
}

/**
 * Унифицированный тип результата любого API-запроса.
 *
 * - `error` — одиночная бизнес-ошибка (читаемый текст)
 * - `errors` — массив ошибок валидации полей
 * - `data` — данные ответа
 *
 * Всегда заполнено ровно одно: либо ошибка(и), либо данные.
 */
export type ApiResult<T> = {
	error: null | string
	errors: null | FieldError[]
	data: T
}

/**
 * Универсальная обёртка для вызовов Orval-сгенерированных функций.
 *
 * Выполняет fetcher, на успехе применяет mapper (если передан),
 * на ошибке анализирует тело ответа и возвращает {@link ApiResult}
 * с читаемыми ошибками.
 *
 * @param fetcher — Orval-функция, возвращающая `{ data, status, headers }`
 * @param mapper — опциональный преобразователь сырых данных в доменный тип
 *
 * @example
 * ```ts
 * const result = await executeApiCall(
 *   () => bookControllerGetBooks(),
 *   (data) => data.map(mapToBook),
 * )
 * // result: ApiResult<Book[]>
 * ```
 */
export async function executeApiCall<TRaw, TMapped = TRaw>(
	fetcher: () => Promise<{ data: TRaw }>,
	mapper?: (raw: TRaw) => TMapped,
): Promise<ApiResult<TMapped>> {
	try {
		const response = await fetcher()
		const data = mapper ? mapper(response.data) : (response.data as unknown as TMapped)

		return { error: null, errors: null, data }
	} catch (e) {
		if (isAbortError(e)) {
			throw e
		}

		return handleApiError<TMapped>(e)
	}
}

// ─── Приватные ──────────────────────────────────────────────────────────────

/**
 * Разбирает тело ошибки от сервера и возвращает {@link ApiResult}.
 *
 * ## Два формата ошибок
 *
 * **1. Бизнес-ошибка (один объект)**
 * ```
 * { message: '{"errorMessageCode":"BOOK_NOT_FOUND"}', code: "NOT_FOUND", statusCode: 404 }
 * ```
 * → резолвится через {@link resolveError}
 *
 * **2. Ошибки валидации (массив)**
 * ```
 * {
 *   statusCode: 400,
 *   message: [
 *     { field: "name", messages: ['{"code":"MUST_BE_STRING","fieldName":"Name"}'] }
 *   ],
 *   error: "Bad Request"
 * }
 * ```
 * → Каждое сообщение резолвится через {@link resolveErrorByCode}
 */
function handleApiError<T>(e: unknown): ApiResult<T> {
	const emptyData = null as unknown as T

	if (!(e instanceof ApiError)) {
		return { error: 'Неизвестная ошибка сервера.', errors: null, data: emptyData }
	}

	const body = e.body

	// Валидационные ошибки: body.message — массив
	if (isValidationErrorBody(body)) {
		const errors: FieldError[] = body.message.map((item: { field: string; messages: string[] }) => ({
			field: item.field,
			messages: item.messages.map((msg) => resolveMessageText(msg)),
		}))
		return { error: null, errors, data: emptyData }
	}

	// Бизнес-ошибка: одиночный объект с errorMessageCode
	return { error: resolveError(e), errors: null, data: emptyData }
}

function isValidationErrorBody(body: unknown): body is { message: Array<{ field: string; messages: string[] }> } {
	if (typeof body !== 'object' || body === null) return false
	const b = body as Record<string, unknown>
	return Array.isArray(b.message)
}

/**
 * Преобразует сырое сообщение ошибки в читаемый текст.
 *
 * Если сообщение — JSON-строка с полем `code`, резолвит его
 * через {@link resolveErrorByCode}. Иначе возвращает как есть.
 */
function resolveMessageText(rawMessage: string): string {
	try {
		const parsed = JSON.parse(rawMessage)
		if (typeof parsed === 'object' && parsed !== null && 'code' in parsed) {
			return resolveErrorByCode(parsed.code, parsed)
		}
		return rawMessage
	} catch {
		return rawMessage
	}
}
