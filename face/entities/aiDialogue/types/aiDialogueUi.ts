/**
 * UI-типы диалога с ИИ (клик по слову и связанный с ним колбэк).
 */

// Результат клика по слову в тексте сообщения.
// `word` — кликнутое слово, `sentence` — весь текст блока, в котором оно стоит.
export type AiDialogueWordSelection = {
	word: string
	sentence: string
}

// Колбэк, вызываемый при клике по слову в тексте сообщения.
export type AiDialogueWordSelectHandler = (selection: AiDialogueWordSelection) => void
