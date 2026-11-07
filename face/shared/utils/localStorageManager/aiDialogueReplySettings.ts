import { getItem, setItem } from './storage'

const AUTO_VOICE_KEY = 'aiDialogueAutoVoice'
const REPLY_TEXT_VISIBLE_KEY = 'aiDialogueReplyTextVisible'

function readFlag(key: string): boolean {
	// Нет сохранённого значения — переключатель включён.
	return getItem(key) !== 'false'
}

function writeFlag(key: string, isEnabled: boolean) {
	setItem(key, String(isEnabled))
}

/** Переключатели «Автоозвучка» и «Текст реплик» на странице диалога. По умолчанию оба включены. */
export const aiDialogueReplySettings = {
	getAutoVoice: () => readFlag(AUTO_VOICE_KEY),
	setAutoVoice: (isEnabled: boolean) => writeFlag(AUTO_VOICE_KEY, isEnabled),
	getReplyTextVisible: () => readFlag(REPLY_TEXT_VISIBLE_KEY),
	setReplyTextVisible: (isVisible: boolean) => writeFlag(REPLY_TEXT_VISIBLE_KEY, isVisible),
}
