import { useCallback, useLayoutEffect, useState } from 'react'
import { localStorageManager } from '@/shared/utils/localStorageManager'

export const VIDEO_PAGE_STORAGE_KEY = 'video'

export function useVideosPageTabs() {
	const [defaultTab, setDefaultTab] = useState<null | string>(null)

	useLayoutEffect(() => {
		const savedTabName = localStorageManager.lastMediaTab.get(VIDEO_PAGE_STORAGE_KEY)
		if (savedTabName) {
			setDefaultTab(savedTabName)
		}
	}, [])

	const onTabChange = useCallback(function (tabKey: string) {
		localStorageManager.lastMediaTab.set(VIDEO_PAGE_STORAGE_KEY, tabKey)
	}, [])

	return { defaultTab, onTabChange }
}
