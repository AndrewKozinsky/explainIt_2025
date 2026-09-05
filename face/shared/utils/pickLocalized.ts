const FALLBACK_KEY = '*'

/**
 * Извлекает текст под текущую локаль из JSON-строки переводов.
 *
 * `title`/`description` сценария хранятся в БД как JSON-объект вида
 * `{"en":"...", "ru":"...", "*":"..."}`, где ключ `*` — fallback («язык не указан»).
 * Если строку не удалось распарсить (например, legacy-данные в виде обычного текста),
 * возвращает её как есть.
 *
 * @param raw    JSON-строка переводов (или обычный текст)
 * @param locale текущая локаль интерфейса (например, `useLocale()`)
 */
export function pickLocalized(raw: string, locale: string): string {
	let map: unknown
	try {
		map = JSON.parse(raw)
	} catch {
		return raw
	}

	if (typeof map !== 'object' || map === null) return raw

	const translations = map as Record<string, string>
	return translations[locale] ?? translations[FALLBACK_KEY] ?? translations[Object.keys(translations)[0]] ?? raw
}
