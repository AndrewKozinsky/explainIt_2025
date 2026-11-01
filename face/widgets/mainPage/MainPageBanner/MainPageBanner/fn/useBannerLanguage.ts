import { useEffect, useState } from 'react'
import { LanguageCode } from '@/shared/utils/languages'

// Порядок, в котором языки сменяют друг друга в баннере
const bannerLanguageCodes: LanguageCode[] = ['en', 'de', 'fr', 'it', 'es', 'tr', 'ru']

// Как часто меняется язык
const bannerLanguageIntervalMs = 4000

/**
 * Переключает язык баннера по кругу.
 * Возвращает код текущего языка и код следующего, чтобы его картинку можно было загрузить заранее.
 */
export function useBannerLanguage() {
	const [index, setIndex] = useState(0)

	useEffect(function () {
		const timerId = setInterval(function () {
			setIndex((prevIndex) => (prevIndex + 1) % bannerLanguageCodes.length)
		}, bannerLanguageIntervalMs)

		return () => clearInterval(timerId)
	}, [])

	return {
		languageCode: bannerLanguageCodes[index],
		nextLanguageCode: bannerLanguageCodes[(index + 1) % bannerLanguageCodes.length],
	}
}
