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
	const translations = parseTranslations(raw)
	if (!translations) return raw

	const text = pickTranslation(translations, locale, (value) => typeof value === 'string')

	return typeof text === 'string' ? text : ''
}

/**
 * Возвращает список на нужном языке из JSON-строки переводов вида `{"en":["...","..."],"ru":["..."]}`.
 * Порядок выбора перевода тот же, что у pickLocalized. Нестроковые элементы отбрасываются.
 * Если строка не JSON-объект или подходящего перевода нет, возвращает пустой массив.
 * @param raw JSON-строка переводов списков.
 * @param locale язык интерфейса, на котором клиент показывает текст.
 */
export function pickLocalizedList(raw: string, locale: Language): string[] {
	const translations = parseTranslations(raw)
	if (!translations) return []

	const list = pickTranslation(translations, locale, Array.isArray)
	if (!Array.isArray(list)) return []

	return list.filter((item): item is string => typeof item === 'string')
}

/** Разбирает JSON-объект переводов; для не-JSON и не-объекта возвращает null. */
function parseTranslations(raw: string): null | Record<string, unknown> {
	let parsed: unknown

	try {
		parsed = JSON.parse(raw)
	} catch {
		return null
	}

	if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null

	return parsed as Record<string, unknown>
}

/** Первый подходящий перевод: язык интерфейса, английский, без языка, затем любой. */
function pickTranslation(
	translations: Record<string, unknown>,
	locale: Language,
	isSuitable: (value: unknown) => boolean,
): unknown {
	const keys = [locale, FALLBACK_LANGUAGE, UNSPECIFIED_LANGUAGE_KEY, ...Object.keys(translations)]

	return keys.map((key) => translations[key]).find(isSuitable)
}
