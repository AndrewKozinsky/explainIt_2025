export const languages = {
	en: {
		name: 'English',
		nameEng: 'english',
		code: 'en',
	},
	es: {
		name: 'Español',
		nameEng: 'spanish',
		code: 'es',
	},
	fr: {
		name: 'Français',
		nameEng: 'french',
		code: 'fr',
	},
	de: {
		name: 'Deutsch',
		nameEng: 'german',
		code: 'de',
	},
	it: {
		name: 'Italiano',
		nameEng: 'italian',
		code: 'it',
	},
	tr: {
		name: 'Türkçe',
		nameEng: 'turkish',
		code: 'tr',
	},
	ru: {
		name: 'Русский',
		nameEng: 'russian',
		code: 'ru',
	},
	/*pt: {
		nameRus: 'Португальский',
		code: 'pt',
	},*/
	/*ar: {
		nameRus: 'Арабский',
		code: 'ar',
	},*/
	/*zhCMN: {
		nameRus: 'Китайский (Мандаринский)',
		code: 'zhCMN',
	},*/
	/*ko: {
		nameRus: 'Корейский',
		code: 'ko',
	},*/
	/*ja: {
		nameRus: 'Японский',
		code: 'ja',
	},*/
}

export type LanguageCode = keyof typeof languages

export const languageKeys = Object.keys(languages) as LanguageCode[]

/**
 * Проверяет, поддерживается ли транскрипция для переданного языка.
 * Сейчас транскрипция доступна только для английского и французского.
 */
export function canLanguageHaveTranscription(languageCode: LanguageCode): boolean {
	return [languages.en.code, languages.fr.code].includes(languageCode)
}
