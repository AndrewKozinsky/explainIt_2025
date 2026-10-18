import { getItem, setItem } from './storage'

const SHOW_TEXT_KEY = 'aiDialogue:showTextForNewMessages'

export const aiDialogueSettings = {
	getShowText(): boolean {
		try {
			return getItem(SHOW_TEXT_KEY) !== 'false'
		} catch {
			return true
		}
	},

	setShowText(visible: boolean) {
		try {
			setItem(SHOW_TEXT_KEY, String(visible))
		} catch {
			// Keep the in-memory preference when browser storage is unavailable.
		}
	},
}
