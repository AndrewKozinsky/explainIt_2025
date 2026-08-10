import { useCallback, useLayoutEffect, useState } from 'react'
import type { TabConfig } from '@/shared/ui/media/MediaPageContentTabs/MediaPageContentTabs'
import { localStorageManager } from '@/shared/utils/localStorageManager'

export const BOOKS_PAGE_STORAGE_KEY = 'books'

export const BOOKS_TABS: TabConfig[] = [
	{ key: 'library', label: 'Библиотека', content: <p /> },
	{ key: 'private', label: 'Мои книги', content: <p /> },
]

export function getDefaultBooksTab(): string {
	return localStorageManager.lastMediaTab.get(BOOKS_PAGE_STORAGE_KEY) ?? BOOKS_TABS[0].key
}

export function useBooksPageTabs() {
	const [defaultTab, setDefaultTab] = useState<string>(() => getDefaultBooksTab())

	useLayoutEffect(() => {
		const saved = localStorageManager.lastMediaTab.get(BOOKS_PAGE_STORAGE_KEY)
		if (saved) {
			setDefaultTab(saved)
		}
	}, [])

	const onTabChange = useCallback(function (tabKey: string) {
		localStorageManager.lastMediaTab.set(BOOKS_PAGE_STORAGE_KEY, tabKey)
	}, [])

	return { defaultTab, onTabChange }
}
