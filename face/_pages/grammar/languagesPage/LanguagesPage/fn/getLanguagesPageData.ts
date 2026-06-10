import { getLocale } from 'next-intl/server'
import { getAvailableLanguages } from 'utils/contentFolder'
import { languageKeys, type LanguageCode } from 'utils/languages'

/**
 * Возвращает коды языков, которые должны отображаться на странице выбора языка —
 * только те, для которых есть контент в content/{locale}/.
 */
export async function getLanguagesPageData(): Promise<LanguageCode[]> {
	const locale = await getLocale()
	const availableCodes = getAvailableLanguages(locale)

	return languageKeys.filter((key) => availableCodes.includes(key))
}
