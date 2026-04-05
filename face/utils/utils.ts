import { keyof } from 'zod'

/** Определяет серверный ли это компонент */
export function isServerComponent() {
	try {
		window.blur()
		return false
	} catch (err) {
		return true
	}
}

export async function wait(delay: number): Promise<void> {
	await new Promise((resolve) => setTimeout(resolve, delay))
}

export function isMacOS(): boolean {
	if (typeof navigator === 'undefined') return false
	const ua = navigator.userAgent || ''
	const platform = (navigator as any).platform || ''
	return /Mac|Macintosh|Mac OS/.test(ua) || /Mac/.test(platform)
}

export function getDeviceType(): 'touch' | 'desktop' {
	if (typeof window === 'undefined' || typeof navigator === 'undefined') return 'desktop'
	try {
		const hasTouch =
			'ontouchstart' in window || (navigator as any).maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0

		const isCoarse = typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches
		return hasTouch || isCoarse ? 'touch' : 'desktop'
	} catch {
		return 'desktop'
	}
}

export const languages = {
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
	ru: {
		nameRus: 'Русский',
		nameEng: 'russian',
		code: 'ru',
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

export type LanguageCode = keyof typeof languages
