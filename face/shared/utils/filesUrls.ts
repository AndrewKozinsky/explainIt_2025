import mainConfig from '@/shared/consts/mainConfig'
import { LanguageCode, languageKeys } from '@/shared/utils/languages'

// Публичный бакет R2 immersia-public: постоянные ссылки без подписи, файлы раздаёт CDN Cloudflare
const r2PublicUrl = 'https://files.immersia.site/'
const s3AssetsUrl = r2PublicUrl + 'assets/'

// Опубликованный сайт берёт файлы главной страницы из папки servermaster, все остальные режимы — из localdev,
// чтобы новую версию файла можно было проверить локально, не меняя её на сайте
const mainPageFilesUrl =
	r2PublicUrl + 'mainPage/' + (mainConfig.workingMode === 'servermaster' ? 'servermaster' : 'localdev') + '/'

export const filesUrls = {
	icons: {
		githubButtonIcon: '/icons/githubButtonIcon.svg',
		googleButtonIcon: '/icons/googleButtonIcon.svg',
		plusButtonIcon: '/icons/plusButtonIcon.svg',
		walletButtonIcon: '/icons/walletButtonIcon.svg',
		yandexButtonIcon: '/icons/yandexButtonIcon.svg',
		fullScreenButtonIcon: '/icons/fullScreenButtonIcon.svg',
		warningTriangleIcon: '/icons/warningTriangleIcon.svg',
		copyButtonIcon: '/icons/copyButtonIcon.svg',
		actionButtonIcon: '/icons/actionButtonIcon.svg',
		checkMarkIcon: '/icons/checkMarkIcon.svg',
		sendMessageIcon: '/icons/sendMessageIcon.svg',
		stopGenerationIcon: '/icons/stopGenerationIcon.svg',
		addIcon: '/icons/addIcon.svg',
	},
	images: {
		common: {
			camera: 'Camera.svg',
			logo: 'logo.svg',
			filesGray: '/images/common/filesGray.svg',
			filesBlue: '/images/common/filesBlue.svg',
		},
		// Круглые флаги языков для ретины: показываются вдвое меньше своего размера
		flags: {
			en: '/images/flags/flag-en.webp',
			es: '/images/flags/flag-es.webp',
			fr: '/images/flags/flag-fr.webp',
			de: '/images/flags/flag-de.webp',
			it: '/images/flags/flag-it.webp',
			tr: '/images/flags/flag-tr.webp',
			ru: '/images/flags/flag-ru.webp',
		} satisfies Record<LanguageCode, string>,
	},
	mainPage: {
		// Иллюстрации баннера, передающие дух каждого языка
		banner: {
			en: '/mainPage/banner/main-banner-en.webp',
			de: '/mainPage/banner/main-banner-de.webp',
			fr: '/mainPage/banner/main-banner-fr.webp',
			it: '/mainPage/banner/main-banner-it.webp',
			es: '/mainPage/banner/main-banner-es.webp',
			tr: '/mainPage/banner/main-banner-tr.webp',
			ru: '/mainPage/banner/main-banner-ru.webp',
		},
		// Персонажи сценариев
		scenarios: {
			taxiDriver: '/mainPage/scenarios/scenario-taxi-driver.webp',
			cafeOwner: '/mainPage/scenarios/scenario-cafe-owner.webp',
			hotelAdmin: '/mainPage/scenarios/scenario-hotel-admin.webp',
		},
		// Иллюстрации раздела «Уровень языка не важен»
		anyLevel: {
			guyThinking: '/mainPage/anyLevel/any-level-guy-thinking.webp',
			baristaListening: '/mainPage/anyLevel/any-level-barista-listening.webp',
			guyCafe: '/mainPage/anyLevel/any-level-guy-cafe.webp',
			baristaCafe: '/mainPage/anyLevel/any-level-barista-cafe.webp',
		},
		// Картинки раздела «6 дополнительных функций»
		features: {
			emotionNeutral: '/mainPage/features/features-emotion-neutral.webp',
			emotionCheerful: '/mainPage/features/features-emotion-cheerful.webp',
			emotionAnnoyed: '/mainPage/features/features-emotion-annoyed.webp',
			emotionSad: '/mainPage/features/features-emotion-sad.webp',
			plotCafe: '/mainPage/features/features-plot-cafe.webp',
			plotTicket: '/mainPage/features/features-plot-ticket.webp',
			plotClothes: '/mainPage/features/features-plot-clothes.webp',
			plotApple: '/mainPage/features/features-plot-apple.webp',
			plotCircus: '/mainPage/features/features-plot-circus.webp',
		},
		// Видео с примером диалога и его постер на языке интерфейса
		demoVideo: Object.fromEntries(
			languageKeys.map(function (locale) {
				const fileBaseUrl = mainPageFilesUrl + 'dialogue-' + locale
				return [locale, { videoUrl: fileBaseUrl + '.mp4', posterUrl: fileBaseUrl + '.jpg' }]
			}),
		) as Record<LanguageCode, { videoUrl: string; posterUrl: string }>,
	},
	onboardingModal: {
		selectedWord: s3AssetsUrl + 'onboardingModal/selectWords.mp4',
	},
}
