import { LanguageCode } from 'prisma/generated/enums'

export type Language = keyof typeof languages

export const languages: Record<LanguageCode, { nameRus: string; nameEng: string; code: string }> = {
	en: {
		nameRus: 'Английский',
		nameEng: 'english',
		code: 'en',
	},
	es: {
		nameRus: 'Испанский',
		nameEng: 'spanish',
		code: 'es',
	},
	fr: {
		nameRus: 'Французский',
		nameEng: 'french',
		code: 'fr',
	},
	de: {
		nameRus: 'Немецкий',
		nameEng: 'german',
		code: 'de',
	},
	/*it: {
		nameRus: 'Итальянский',
		code: 'it',
	},*/
	/*pt: {
		nameRus: 'Португальский',
		code: 'pt',
	},*/
	/*tr: {
		nameRus: 'Турецкий',
		code: 'ja',
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
