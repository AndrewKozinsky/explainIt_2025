import { LanguageCode } from '@/shared/utils/languages'

export type FigureImage = {
	src: string
	alt: string
	// Подпись в углу картинки, например «Кафе в Лондоне · вечер»
	place: string
}

type FigureScene = {
	// Название языка в именительном падеже: «Ваш ... пригодится уже в первой сцене»
	languageName: string
	// Иллюстрация, которая передаёт дух языка. null — картинка ещё не готова, показывается картинка по умолчанию
	image: null | FigureImage
}

const figureScenes: Record<LanguageCode, FigureScene> = {
	en: {
		languageName: 'английский',
		image: {
			src: '/mainPage/banner/cafe-1428.webp',
			alt: 'Молодой человек с кофе разговаривает с бариста в уютном кафе',
			place: 'Кафе в Лондоне · вечер',
		},
	},
	de: { languageName: 'немецкий', image: null },
	fr: { languageName: 'французский', image: null },
	it: { languageName: 'итальянский', image: null },
	es: { languageName: 'испанский', image: null },
	tr: { languageName: 'турецкий', image: null },
	ru: { languageName: 'русский', image: null },
}

const defaultImage = figureScenes.en.image!

/** Возвращает картинку языка, а если она ещё не готова — картинку по умолчанию */
export function getFigureImage(languageCode: LanguageCode) {
	return figureScenes[languageCode].image ?? defaultImage
}

/** Возвращает подпись под местом сцены */
export function getFigureCaptionText(languageCode: LanguageCode) {
	return `Ваш ${figureScenes[languageCode].languageName} пригодится уже в первой сцене.`
}
