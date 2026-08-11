import { useEffect, useMemo, useState } from 'react'
import type { LanguageCode } from '@/shared/utils/languages'
import { localStorageManager } from '@/shared/utils/localStorageManager'
import type { YouTubeVideosFilterValues } from '@/widgets/video/YouTubeVideosFilterForm/fn/types'

function useYouTubeVideosFilter() {
	const [languageCode, setLanguageCode] = useState<LanguageCode | undefined>(function () {
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

	const filterValues: YouTubeVideosFilterValues = useMemo(
		function () {
			return { languageCode }
		},
		[languageCode],
	)

	function handleFilterChange(values: YouTubeVideosFilterValues) {
		setLanguageCode(values.languageCode)
	}

	return { filterValues, handleFilterChange }
}

export default useYouTubeVideosFilter
