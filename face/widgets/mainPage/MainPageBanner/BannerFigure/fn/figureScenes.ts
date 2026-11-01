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
	// Иллюстрация, которая передаёт дух языка
	image: FigureImage
}

const figureScenes: Record<LanguageCode, FigureScene> = {
	en: {
		languageName: 'английский',
		image: {
			src: '/mainPage/banner/main-banner-en.webp',
			alt: 'Молодой человек с кофе разговаривает с бариста в уютном кафе',
			place: 'Кафе в Лондоне · вечер',
		},
	},
	de: {
		languageName: 'немецкий',
		image: {
			src: '/mainPage/banner/main-banner-de.webp',
			alt: 'Молодой человек покупает глинтвейн у продавщицы на рождественской ярмарке',
			place: 'Рождественская ярмарка в Нюрнберге · вечер',
		},
	},
	fr: {
		languageName: 'французский',
		image: {
			src: '/mainPage/banner/main-banner-fr.webp',
			alt: 'Молодой человек разговаривает с букинистом на набережной Сены',
			place: 'Набережная Сены в Париже · утро',
		},
	},
	it: {
		languageName: 'итальянский',
		image: {
			src: '/mainPage/banner/main-banner-it.webp',
			alt: 'Продавщица на римском рынке протягивает молодому человеку лимон',
			place: 'Рынок в Риме · полдень',
		},
	},
	es: {
		languageName: 'испанский',
		image: {
			src: '/mainPage/banner/main-banner-es.webp',
			alt: 'Хозяйка гостевого дома отдаёт молодому человеку ключ во внутреннем дворике',
			place: 'Патио в Севилье · закат',
		},
	},
	tr: {
		languageName: 'турецкий',
		image: {
			src: '/mainPage/banner/main-banner-tr.webp',
			alt: 'Продавец ламп на базаре предлагает молодому человеку чай',
			place: 'Гранд-базар в Стамбуле · день',
		},
	},
	ru: {
		languageName: 'русский',
		image: {
			src: '/mainPage/banner/main-banner-ru.webp',
			alt: 'Попутчица в купе поезда ставит перед молодым человеком стакан чая в подстаканнике',
			place: 'Поезд Москва — Петербург · ночь',
		},
	},
}

/** Возвращает картинку языка */
export function getFigureImage(languageCode: LanguageCode) {
	return figureScenes[languageCode].image
}

/** Возвращает подпись под местом сцены */
export function getFigureCaptionText(languageCode: LanguageCode) {
	return `Ваш ${figureScenes[languageCode].languageName} пригодится уже в первой сцене.`
}
