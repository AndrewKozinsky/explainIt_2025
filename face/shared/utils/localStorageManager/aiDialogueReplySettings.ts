import { getItem, setItem } from './storage'

const AUTO_VOICE_KEY = 'aiDialogueAutoVoice'
const REPLY_TEXT_VISIBLE_KEY = 'aiDialogueReplyTextVisible'
const SCENE_IMAGE_GENERATION_KEY = 'aiDialogueSceneImageGeneration'

function readFlag(key: string): boolean {
	// Нет сохранённого значения — переключатель включён.
	return getItem(key) !== 'false'
}

function writeFlag(key: string, isEnabled: boolean) {
	setItem(key, String(isEnabled))
}

/** Все переключатели настроек диалога включены по умолчанию. */
export const aiDialogueReplySettings = {
	getAutoVoice: () => readFlag(AUTO_VOICE_KEY),
	setAutoVoice: (isEnabled: boolean) => writeFlag(AUTO_VOICE_KEY, isEnabled),
	getReplyTextVisible: () => readFlag(REPLY_TEXT_VISIBLE_KEY),
	setReplyTextVisible: (isVisible: boolean) => writeFlag(REPLY_TEXT_VISIBLE_KEY, isVisible),
	getSceneImageGeneration: () => readFlag(SCENE_IMAGE_GENERATION_KEY),
	setSceneImageGeneration: (isEnabled: boolean) => writeFlag(SCENE_IMAGE_GENERATION_KEY, isEnabled),
}
