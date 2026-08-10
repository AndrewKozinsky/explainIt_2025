import { useCallback, useState } from 'react'
import { localStorageManager } from '@/shared/utils/localStorageManager'

const YOUTUBE_PAGE_KEY = 'youtube'

export function useYouTubeVideosPageTabs() {
	const [defaultTab] = useState<string>(() => {
		return localStorageManager.lastMediaTab.get(YOUTUBE_PAGE_KEY) ?? 'saved'
	})

	const onTabChange = useCallback(function (tabKey: string) {
		localStorageManager.lastMediaTab.set(YOUTUBE_PAGE_KEY, tabKey)
	}, [])

	return { defaultTab, onTabChange }
}
