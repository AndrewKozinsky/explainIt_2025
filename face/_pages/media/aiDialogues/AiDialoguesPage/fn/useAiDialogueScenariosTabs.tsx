import { useCallback, useLayoutEffect, useState } from 'react'
import { localStorageManager } from '@/shared/utils/localStorageManager'

export const AI_DIALOGUE_SCENARIOS_PAGE_STORAGE_KEY = 'dialogues'

export function useAiDialogueScenariosTabs() {
	const [defaultTab, setDefaultTab] = useState<null | string>(null)

	useLayoutEffect(() => {
		const saved = localStorageManager.lastMediaTab.get(AI_DIALOGUE_SCENARIOS_PAGE_STORAGE_KEY)
		if (saved) {
			setDefaultTab(saved)
		}
	}, [])

	const onTabChange = useCallback(function (tabKey: string) {
		localStorageManager.lastMediaTab.set(AI_DIALOGUE_SCENARIOS_PAGE_STORAGE_KEY, tabKey)
	}, [])

	return { defaultTab, onTabChange }
}
