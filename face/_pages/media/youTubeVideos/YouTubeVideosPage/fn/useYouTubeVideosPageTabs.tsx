import { useCallback, useLayoutEffect, useState } from 'react'
import type { TabConfig } from '@/shared/ui/media/MediaPageContentTabs/MediaPageContentTabs'
import { localStorageManager } from '@/shared/utils/localStorageManager'

export const YOUTUBE_PAGE_STORAGE_KEY = 'youtube'

export const YOUTUBE_TABS: TabConfig[] = [
	{ key: 'saved', label: 'Подборка', content: <p /> },
	{ key: 'youtube', label: 'Поиск', content: <p /> },
	{ key: 'user', label: 'Мои видео', content: <p /> },
]

export function useYouTubeVideosPageTabs() {
	const [defaultTab, setDefaultTab] = useState<string>(YOUTUBE_TABS[0].key)

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
