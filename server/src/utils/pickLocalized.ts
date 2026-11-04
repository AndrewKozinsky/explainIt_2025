import { Language } from 'utils/languages'

/** Ключ перевода, который используется, если язык текста не указан. */
const UNSPECIFIED_LANGUAGE_KEY = '*'
const FALLBACK_LANGUAGE: Language = 'en'

/**
 * Возвращает текст на нужном языке из JSON-строки переводов вида `{"en":"...","ru":"..."}`.
 * Если перевода нет, берёт английский, затем перевод без языка (`*`), затем первый доступный.
 * Строку, которая не является JSON-объектом (например, текст пользовательского сценария), возвращает как есть.
 * @param raw JSON-строка переводов или обычный текст.
 * @param locale язык интерфейса, на котором клиент показывает текст.
 */
export function pickLocalized(raw: string, locale: Language): string {
	let parsed: unknown
	try {
		parsed = JSON.parse(raw)
	} catch {
		return raw
	}

	if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return raw

	const translations = parsed as Record<string, unknown>
	const keys = [locale, FALLBACK_LANGUAGE, UNSPECIFIED_LANGUAGE_KEY, ...Object.keys(translations)]
	const text = keys.map((key) => translations[key]).find((value) => typeof value === 'string')

	return typeof text === 'string' ? text : ''
}
