import type { AiDialogueEventType } from './aiDialogueMessage'

/**
 * Ленивое «превью» события, собранное из частичного JSON во время стрима LLM.
 *
 * В отличие от строгого AiDialogueEvent (см. aiDialogueMessage.ts) здесь всё
 * опционально: поле `type` может ещё не прийти, строки обрезаны, массивы пусты.
 * Роутер по отсутствующему/неизвестному `type` показывает плейсхолдер
 * «Ответ от ИИ готовится», а компоненты конкретных типов подставляют пустые
 * значения вместо недостающих полей, чтобы не спотыкаться.
 */
export type AiDialoguePreviewEvent = {
	type?: AiDialogueEventType
	content?: string
	translation?: string
	npcId?: string
	npcName?: string
	npcRole?: string
	emotion?: string
	actions?: AiDialoguePreviewActionItem[]
}

// Элемент действия/реплики в превью: оба поля опциональны (обрезанный JSON).
export type AiDialoguePreviewActionItem = {
	type?: 'action' | 'speech'
	content?: string
	translation?: string
}
