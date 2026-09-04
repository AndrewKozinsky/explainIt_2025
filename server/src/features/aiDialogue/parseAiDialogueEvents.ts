import { jsonrepair } from 'jsonrepair'
import { AiDialogueActionItem, AiDialogueEvent } from 'types/aiDialogueMessage'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'

/**
 * Разбирает накопленный текст ответа LLM в список событий диалога.
 *
 * LLM отвечает JSON-объектом `{ events: [...] }` (responseFormat: json_object).
 * Текст может быть «сломанным» (например, обрезан) — сначала чиним его через
 * jsonrepair, затем JSON.parse и строго валидируем дискриминированный union.
 * При любой невалидной структуре бросаем cannotParseLlmResponse.
 */
export function parseAiDialogueEvents(raw: string): AiDialogueEvent[] {
	const repaired = jsonrepair(raw.trim())
	const parsed = JSON.parse(repaired) as { events?: unknown }

	if (!isRecord(parsed) || !Array.isArray(parsed.events)) {
		throw cannotParse()
	}

	return parsed.events.map((event) => parseEvent(event))
}

function parseEvent(event: unknown): AiDialogueEvent {
	if (!isRecord(event) || typeof event.type !== 'string') {
		throw cannotParse()
	}

	switch (event.type) {
	case 'sceneUpdate':
		return { type: 'sceneUpdate', newScene: requireString(event, 'newScene') }
	case 'help':
		return { type: 'help', help: requireString(event, 'help') }
	case 'npcActions':
		return {
			type: 'npcActions',
			npcId: requireString(event, 'npcId'),
			npcName: requireString(event, 'npcName'),
			npcRole: requireString(event, 'npcRole'),
			emotion: requireString(event, 'emotion'),
			actions: requireActionItems(event, 'actions'),
		}
	case 'userActions':
		return { type: 'userActions', actions: requireActionItems(event, 'actions') }
	case 'userAvoidsNPC':
		return { type: 'userAvoidsNPC' }
	case 'worldEvent':
		return { type: 'worldEvent', content: requireString(event, 'content') }
	default:
		throw cannotParse()
	}
}

function requireString(event: Record<string, unknown>, key: string): string {
	const value = event[key]
	if (typeof value !== 'string') {
		throw cannotParse()
	}
	return value
}

function requireActionItems(event: Record<string, unknown>, key: string): AiDialogueActionItem[] {
	const value = event[key]
	if (!Array.isArray(value)) {
		throw cannotParse()
	}

	return value.map((item) => {
		if (!isRecord(item) || (item.type !== 'action' && item.type !== 'speech') || typeof item.content !== 'string') {
			throw cannotParse()
		}

		return { type: item.type, content: item.content }
	})
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null
}

function cannotParse(): CustomError {
	return new CustomError(errorMessage.aiDialogue.cannotParseLlmResponse, ErrorStatusCode.InternalServerError_500)
}
