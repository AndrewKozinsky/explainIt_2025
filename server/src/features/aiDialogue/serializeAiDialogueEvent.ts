import { AiDialogueActionItem, AiDialogueEvent } from 'types/aiDialogueMessage'

// Приводит событие диалога к компактному текстовому виду для подстановки в промпт
// (как в промпт генерации хода, так и в промпт сжатия истории).
export function serializeAiDialogueEvent(event: AiDialogueEvent): string {
	switch (event.type) {
		case 'sceneUpdate':
			return `[сцена] ${event.content}`
		case 'help':
			return `[подсказка] ${event.content}`
		case 'npcActions': {
			const acts = event.actions.map(serializeAction).join('; ')
			return `[${event.npcName} (${event.npcRole}), ${event.emotion}] ${acts}`
		}
		case 'userActions': {
			const acts = event.actions.map(serializeAction).join('; ')
			return `[пользователь] ${acts}`
		}
		case 'userAvoidsNPC':
			return '[the learner walked away from the conversation]'
		case 'worldEvent':
			return `[событие] ${event.content}`
	}
}

function serializeAction(action: AiDialogueActionItem): string {
	return action.type === 'speech' ? `«${action.content}»` : `*${action.content}*`
}
