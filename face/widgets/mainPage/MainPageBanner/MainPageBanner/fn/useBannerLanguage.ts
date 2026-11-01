import { useEffect, useState } from 'react'
import { useLanguagesToLearn } from '@/shared/utils/useLanguagesToLearn'

// Как часто меняется язык
const bannerLanguageIntervalMs = 4000

/**
 * Переключает язык баннера по кругу.
 * Язык интерфейса пропускается: изучать язык, на котором читаешь сайт, не нужно.
 * Возвращает показываемые языки, код текущего и код следующего, чтобы его картинку можно было загрузить заранее.
 */
export function useBannerLanguage() {
	const languageCodes = useLanguagesToLearn()

	const [index, setIndex] = useState(0)

	useEffect(
		function () {
			const timerId = setInterval(function () {
				setIndex((prevIndex) => (prevIndex + 1) % languageCodes.length)
			}, bannerLanguageIntervalMs)

			return () => clearInterval(timerId)
		},
		[languageCodes.length],
	)

	return {
		languageCodes,
		languageCode: languageCodes[index % languageCodes.length],
		nextLanguageCode: languageCodes[(index + 1) % languageCodes.length],
	}
}
