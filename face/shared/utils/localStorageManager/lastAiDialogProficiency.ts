import { getItem, setItem } from './storage'

const LAST_AI_DIALOG_PROFICIENCY_KEY = 'lastAiDialogProficiency'

/** Последний выбранный уровень для создания диалога; хранится отдельно от фильтра видео. */
export const lastAiDialogProficiency = {
	get: () => getItem(LAST_AI_DIALOG_PROFICIENCY_KEY),
	set: (value: string) => setItem(LAST_AI_DIALOG_PROFICIENCY_KEY, value),
}
