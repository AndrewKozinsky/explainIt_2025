import { useCallback, useState } from 'react'
import { localStorageManager } from '@/shared/utils/localStorageManager'

const BOOKS_PAGE_KEY = 'books'

export function useBooksPageTabs() {
	const [defaultTab] = useState<string>(() => {
		return localStorageManager.lastMediaTab.get(BOOKS_PAGE_KEY) ?? 'library'
	})

	const onTabChange = useCallback(function (tabKey: string) {
		localStorageManager.lastMediaTab.set(BOOKS_PAGE_KEY, tabKey)
	}, [])

	return { defaultTab, onTabChange }
}
