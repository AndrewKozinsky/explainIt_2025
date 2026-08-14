import { useCallback, useLayoutEffect, useState } from 'react'
import { localStorageManager } from '@/shared/utils/localStorageManager'

export const YOUTUBE_PAGE_STORAGE_KEY = 'youtube'

export function useVideosPageTabs() {
	const [defaultTab, setDefaultTab] = useState<string>('saved')

	useLayoutEffect(() => {
		const saved = localStorageManager.lastMediaTab.get(YOUTUBE_PAGE_STORAGE_KEY)
		if (saved) {
			setDefaultTab(saved)
		}
	}, [])

	const onTabChange = useCallback(function (tabKey: string) {
		localStorageManager.lastMediaTab.set(YOUTUBE_PAGE_STORAGE_KEY, tabKey)
	}, [])

	return { defaultTab, onTabChange }
}
