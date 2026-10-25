import type { AiDialogueLastMessageOutModel } from 'models/aiDialogue/aiDialogueList.out.model'

type LastNpcMessage = { id: number; payload: string; created_at: Date }

/** Последняя непустая реплика имеет приоритет над действиями внутри последнего сообщения NPC. */
export function getAiDialogueLastMessage(message?: LastNpcMessage): AiDialogueLastMessageOutModel | null {
	if (!message) return null

	const payload = JSON.parse(message.payload) as Record<string, unknown>
	const actions: unknown[] = Array.isArray(payload.actions) ? payload.actions : []
	const speech = getLastActionText(actions, 'speech')
	const action = speech ? null : getLastActionText(actions, 'action')

	return {
		id: message.id,
		npcId: getNonemptyString(payload.npcId),
		name: getNonemptyString(payload.npcName),
		role: getNonemptyString(payload.npcRole),
		text: speech ?? action ?? '',
		textType: speech ? 'speech' : action ? 'action' : null,
		createdAt: message.created_at.toISOString(),
	}
}

function getLastActionText(actions: unknown[], type: 'speech' | 'action'): string | null {
	for (let index = actions.length - 1; index >= 0; index--) {
		const action = actions[index]
		if (!action || typeof action !== 'object' || !('type' in action) || action.type !== type) continue
		const content = 'content' in action ? getNonemptyString(action.content) : null

		if (content) return content
	}

	return null
}

function getNonemptyString(value: unknown): string | null {
	return typeof value === 'string' && value.trim() ? value.trim() : null
}
