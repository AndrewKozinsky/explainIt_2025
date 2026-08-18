import { getItem, setItem } from './storage'

function key(pageKey: string) {
	return `lastMediaTab:${pageKey}`
}

export const lastMediaTab = {
	get(pageKey: string): string | null {
		return getItem(key(pageKey)) || null
	},

	set(pageKey: string, tabKey: string) {
		setItem(key(pageKey), tabKey)
	},
}
