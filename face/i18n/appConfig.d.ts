import type { routing } from './routing'

/**
 * Типизация next-intl: useLocale(), getLocale() и параметры locale
 * возвращают код языка приложения (LanguageCode), а не произвольную строку.
 */
declare module 'next-intl' {
	interface AppConfig {
		Locale: (typeof routing.locales)[number]
	}
}
