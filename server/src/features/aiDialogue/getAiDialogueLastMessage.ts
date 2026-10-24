import type { AiDialogueLastMessageOutModel } from 'models/aiDialogue/aiDialogueList.out.model'

type LastNpcMessage = { id: number; payload: string; created_at: Date }

/** Речь имеет приоритет внутри последнего сообщения NPC; другие события не заменяют его. */
export function getAiDialogueLastMessage(message?: LastNpcMessage): AiDialogueLastMessageOutModel | null {
	if (!message) return null

	const payload = JSON.parse(message.payload) as Record<string, unknown>
	const actions: unknown[] = Array.isArray(payload.actions) ? payload.actions : []
	const speech = getActionTexts(actions, 'speech')
	const action = speech.length ? [] : getActionTexts(actions, 'action')

	return {
		id: message.id,
		npcId: getNonemptyString(payload.npcId),
		name: getNonemptyString(payload.npcName),
		role: getNonemptyString(payload.npcRole),
		text: [...speech, ...action].join('\n'),
		textType: speech.length ? 'speech' : action.length ? 'action' : null,
		createdAt: message.created_at.toISOString(),
	}
}

function getActionTexts(actions: unknown[], type: string): string[] {
	return actions.flatMap((action) => {
		if (!action || typeof action !== 'object' || !('type' in action) || action.type !== type) return []
		const content = 'content' in action ? getNonemptyString(action.content) : null

		return content ? [content] : []
	})
}

function getNonemptyString(value: unknown): string | null {
	return typeof value === 'string' && value.trim() ? value.trim() : null
}
