import { jsonrepair } from 'jsonrepair'
import type { AiDialogueEventType } from '@/entities/aiDialogue/types/aiDialogueMessage'
import type { AiDialoguePreviewActionItem, AiDialoguePreviewEvent } from '@/entities/aiDialogue/types/aiDialoguePreview'

/**
 * Разбирает накопленный (частичный) текст ответа LLM в превью-события.
 *
 * LLM отвечает JSON `{ events: [...] }`. Во время стрима текст обрезан, поэтому
 * сначала чиним его через jsonrepair, затем JSON.parse и мягко собираем события:
 * недостающие/обрезанные поля не роняют парсер — они просто отсутствуют в
 * превью (см. AiDialoguePreviewEvent).
 *
 * Возвращает `null`, если текст ещё нельзя распарсить (JSON недособран). Тогда
 * вызывающий код оставляет предыдущее превью без изменений, чтобы не было мерцания.
 */
export function parseAiDialoguePreview(raw: string): null | AiDialoguePreviewEvent[] {
	const trimmed = raw.trim()
	if (!trimmed) return null

	try {
		const repaired = jsonrepair(trimmed)
		const parsed: unknown = JSON.parse(repaired)

		if (!isRecord(parsed) || !Array.isArray(parsed.events)) return null

		return parsed.events.map(toPreviewEvent)
	} catch {
		return null
	}
}

const AI_DIALOGUE_EVENT_TYPES: readonly AiDialogueEventType[] = [
	'sceneUpdate',
	'help',
	'npcActions',
	'userActions',
	'userAvoidsNPC',
	'worldEvent',
]

function toPreviewEvent(raw: unknown): AiDialoguePreviewEvent {
	if (!isRecord(raw)) return {}

	const event: AiDialoguePreviewEvent = {}

	if (isAiDialogueEventType(raw.type)) {
		event.type = raw.type
	}
	if (typeof raw.content === 'string') {
		event.content = raw.content
	}
	if (typeof raw.translation === 'string') {
		event.translation = raw.translation
	}
	if (typeof raw.npcId === 'string') {
		event.npcId = raw.npcId
	}
	if (typeof raw.npcName === 'string') {
		event.npcName = raw.npcName
	}
	if (typeof raw.npcRole === 'string') {
		event.npcRole = raw.npcRole
	}
	if (typeof raw.emotion === 'string') {
		event.emotion = raw.emotion
	}
	if (Array.isArray(raw.actions)) {
		event.actions = raw.actions.map(toPreviewActionItem)
	}

	return event
}

function toPreviewActionItem(raw: unknown): AiDialoguePreviewActionItem {
	if (!isRecord(raw)) return {}

	const item: AiDialoguePreviewActionItem = {}

	if (raw.type === 'action' || raw.type === 'speech') {
		item.type = raw.type
	}
	if (typeof raw.content === 'string') {
		item.content = raw.content
	}
	if (typeof raw.translation === 'string') {
		item.translation = raw.translation
	}

	return item
}

function isAiDialogueEventType(value: unknown): value is AiDialogueEventType {
	return typeof value === 'string' && AI_DIALOGUE_EVENT_TYPES.includes(value as AiDialogueEventType)
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null
}
