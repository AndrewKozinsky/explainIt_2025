import type { AiDialogueWordMapBlock } from './aiDialogueWordMap'

/**
 * UI-типы диалога с ИИ (клик по слову и связанный с ним колбэк).
 */

// Результат клика по слову в тексте сообщения.
// `word` — готовая фраза из карты или нажатое слово; `sentence` — исходный текст блока.
export type AiDialogueWordSelection = {
	word: string
	sentence: string
}

// Колбэк, вызываемый при клике по слову в тексте сообщения.
export type AiDialogueWordSelectHandler = (selection: AiDialogueWordSelection) => void

export type AiDialogueTextMappingProps = {
	wordMap?: AiDialogueWordMapBlock
}
