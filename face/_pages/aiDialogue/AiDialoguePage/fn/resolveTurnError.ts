import { resolveErrorByCode } from '@/shared/utils/fetchData/resolveError'

/**
 * Резолвит текст ошибки хода (turnError) в читаемое сообщение.
 *
 * Сервер для CustomError присылает не готовый текст, а JSON-строку вида
 * `{"code":"AI_DIALOGUE_CANNOT_PARSE_LLM_RESPONSE"}`. Если это JSON с полем
 * `code` — резолвим через resolveErrorByCode, иначе возвращаем как есть.
 */
export function resolveAiDialogueTurnError(raw: string): string {
	try {
		const parsed: unknown = JSON.parse(raw)
		if (typeof parsed === 'object' && parsed !== null) {
			const code = (parsed as { code?: unknown }).code
			if (typeof code === 'string') {
				return resolveErrorByCode(code, parsed)
			}
		}
	} catch {
		// не JSON — возвращаем как есть
	}

	return raw
}
