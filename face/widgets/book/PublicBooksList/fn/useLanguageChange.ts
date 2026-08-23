import { useCallback, useEffect, useState } from 'react'
import { LanguageCode } from '@/shared/utils/languages'
import { localStorageManager } from '@/shared/utils/localStorageManager'

export function useLanguageChange(languages: LanguageCode[]) {
	const [currentLang, setCurrentLang] = useState<LanguageCode>(
		() => localStorageManager.lastLanguage.get() ?? languages[0],
	)

	useEffect(() => {
		if (!currentLang && languages.length > 0) {
			setCurrentLang(languages[0])
		}
	}, [languages, currentLang])

	const onLanguageChange = useCallback((lang: LanguageCode) => {
		setCurrentLang(lang)
		localStorageManager.lastLanguage.set(lang)
	}, [])

	return { currentLang, onLanguageChange }
}
