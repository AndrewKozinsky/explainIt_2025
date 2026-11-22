import type { AiDialogueClientEvent } from './aiDialogueMessage'
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

/** null после подтверждённой отправки, иначе текст ошибки. */
export type SendAiDialogueMessage = (event: AiDialogueClientEvent) => Promise<string | null>

export type AiDialogueTextMappingProps = {
	wordMap?: AiDialogueWordMapBlock
}
