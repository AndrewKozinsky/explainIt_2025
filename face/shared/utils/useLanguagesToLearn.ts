import { useLocale } from 'next-intl'
import { languageKeys, LanguageCode } from '@/shared/utils/languages'

/** Возвращает языки, которые имеет смысл изучать, — все, кроме языка интерфейса */
export function useLanguagesToLearn(): LanguageCode[] {
	const locale = useLocale()

	return languageKeys.filter((code) => code !== locale)
}
