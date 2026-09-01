import { useEffect, useState } from 'react'
import type { LanguageCode } from '@/shared/utils/languages'
import { localStorageManager } from '@/shared/utils/localStorageManager'

function useLanguageFilter() {
	const [languageCode, setLanguageCode] = useState<LanguageCode | null>(function () {
		return localStorageManager.lastLanguage.get()
	})

	useEffect(
		function () {
			if (languageCode) {
				localStorageManager.lastLanguage.set(languageCode)
			}
		},
		[languageCode],
	)

	return { languageCode, setLanguageCode }
}

export default useLanguageFilter
