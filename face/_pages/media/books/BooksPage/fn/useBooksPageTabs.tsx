// import { useCallback, useLayoutEffect, useState } from 'react'
// import { localStorageManager } from '@/shared/utils/localStorageManager'

// export const BOOKS_PAGE_STORAGE_KEY = 'books'

/*export function useBooksPageTabs() {
	const [defaultTab, setDefaultTab] = useState<null | string>(null)

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
}*/
