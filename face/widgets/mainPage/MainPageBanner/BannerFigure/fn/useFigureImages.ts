import { useState } from 'react'
import { LanguageCode } from '@/shared/utils/languages'

/**
 * Возвращает языки, чьи картинки нужно держать в разметке:
 * уже показанные (для плавной смены) и следующий — его картинка загружается заранее, чтобы смена была без мигания.
 */
export function useFigureImages(languageCode: LanguageCode, nextLanguageCode?: LanguageCode) {
	const [shownCodes, setShownCodes] = useState<LanguageCode[]>([languageCode])

	// Новый язык — запоминаем его прямо во время рендера, чтобы картинка сразу осталась в разметке
	if (!shownCodes.includes(languageCode)) {
		setShownCodes([...shownCodes, languageCode])
	}

	const renderedCodes = [...shownCodes]

	if (nextLanguageCode && !renderedCodes.includes(nextLanguageCode)) {
		renderedCodes.push(nextLanguageCode)
	}

	return renderedCodes
}
