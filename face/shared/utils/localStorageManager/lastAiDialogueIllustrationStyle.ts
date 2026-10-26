import { getItem, setItem } from './storage'

const LAST_AI_DIALOGUE_ILLUSTRATION_STYLE_KEY = 'lastAiDialogueIllustrationStyle'

/** Доступность id проверяется по актуальному серверному каталогу, без списка стилей в клиенте. */
export const lastAiDialogueIllustrationStyle = {
	get(): string | null {
		try {
			return getItem(LAST_AI_DIALOGUE_ILLUSTRATION_STYLE_KEY)
		} catch {
			return null
		}
	},
	set(value: string) {
		try {
			setItem(LAST_AI_DIALOGUE_ILLUSTRATION_STYLE_KEY, value)
		} catch {
			/* Выбор остаётся в открытом окне. */
		}
	},
}
