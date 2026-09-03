import { AiDialogueActionItem, AiDialogueEvent } from 'types/aiDialogueMessage'

// Приводит событие диалога к компактному текстовому виду для подстановки в промпт
// (как в промпт генерации хода, так и в промпт сжатия истории).
export function serializeAiDialogueEvent(event: AiDialogueEvent): string {
	switch (event.type) {
		case 'sceneUpdate':
			return `[сцена] ${event.newScene}`
		case 'help':
			return `[подсказка] ${event.help}`
		case 'npcActions': {
			const acts = event.actions.map(serializeAction).join('; ')
			return `[${event.npcName} (${event.npcRole}), ${event.emotion}] ${acts}`
		}
		case 'userActions': {
			const acts = event.actions.map(serializeAction).join('; ')
			return `[пользователь] ${acts}`
		}
		case 'userAvoidsNPC':
			return '[пользователь ушёл от разговора]'
		case 'worldEvent':
			return `[событие] ${event.content}`
	}
}

function serializeAction(action: AiDialogueActionItem): string {
	return action.type === 'speech' ? `«${action.content}»` : `*${action.content}*`
}
