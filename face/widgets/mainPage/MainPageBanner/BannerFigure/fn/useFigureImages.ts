import { useState } from 'react'
import { LanguageCode } from '@/shared/utils/languages'
import { FigureImage, getFigureImage } from './figureScenes'

/**
 * Возвращает активную картинку и картинки, которые нужно держать в разметке:
 * уже показанные (для плавной смены) и следующую — она загружается заранее, чтобы смена была без мигания.
 */
export function useFigureImages(languageCode: LanguageCode, nextLanguageCode?: LanguageCode) {
	const activeImage = getFigureImage(languageCode)
	const [shownImages, setShownImages] = useState<FigureImage[]>([activeImage])

	// Новая картинка — запоминаем её прямо во время рендера, чтобы она сразу осталась в разметке
	if (!shownImages.includes(activeImage)) {
		setShownImages([...shownImages, activeImage])
	}

	const renderedImages = [...shownImages]
	const nextImage = nextLanguageCode && getFigureImage(nextLanguageCode)

	if (nextImage && !renderedImages.includes(nextImage)) {
		renderedImages.push(nextImage)
	}

	return { activeImage, renderedImages }
}
