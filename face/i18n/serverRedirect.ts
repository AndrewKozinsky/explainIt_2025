import { getLocale } from 'next-intl/server'
import { redirect as intlRedirect } from './routing'

/**
 * Серверный редирект с автоматической подстановкой текущей локали.
 *
 * Используется вместо `redirect` из `@/i18n/routing`, когда неудобно
 * передавать `{ href, locale }` объектом. В отличие от клиентского
 * `redirect`, эта функция сама получает локаль через `getLocale()`.
 *
 * @example
 *   await serverRedirect(pageUrls.books.path) // → /en/books
 */
export async function serverRedirect(href: string): Promise<never> {
	const locale = await getLocale()

	return intlRedirect({ href, locale })
}
