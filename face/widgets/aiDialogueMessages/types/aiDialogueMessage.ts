import type { UserMessagePartCheck } from '@/entities/aiDialogue/messageCheck/userMessageCheckTypes'
import type { AiDialogueWordMap } from './aiDialogueWordMap'

/**
 * Типы событий ролевого диалога с ИИ (AiDialogue) — клиентское зеркало
 * `server/src/types/aiDialogueMessage.ts`.
 *
 * Одно событие = одна строка в таблице AiDialogueMessage. Все события имеют
 * дискриминатор `type`. Поля `id`, `dialogueId` и `createdAt` в событие НЕ входят —
 * их назначает сервер при сохранении и добавляет в обёртку DialogueServerMessage.
 */

// Действие или реплика (используется внутри npcActions и userActions).
export type AiDialogueActionItem = {
	type: 'action' | 'speech'
	content: string
}

// Действие или реплика NPC с переводом на родной язык пользователя.
export type AiDialogueNpcActionItem = AiDialogueActionItem & {
	translation: string
}

// Смена сцены — где сейчас находится пользователь.
export type SceneUpdateEvent = {
	type: 'sceneUpdate'
	content: string
	translation: string
	visualDescription?: string
	participantNpcIds?: string[]
	wordMap?: AiDialogueWordMap
}

// Подсказка, что следует сделать пользователю (если NPC не может обратиться напрямую).
export type HelpEvent = {
	type: 'help'
	content: string
	translation: string
	wordMap?: AiDialogueWordMap
}

// Действия и реплики NPC.
export type NpcActionsEvent = {
	type: 'npcActions'
	npcId: string
	npcName: string
	npcRole: string
	emotion: string
	actions: AiDialogueNpcActionItem[]
	wordMap?: AiDialogueWordMap
}

type UserActionsInputEvent = {
	type: 'userActions'
	actions: AiDialogueActionItem[]
}

// Сохранённые действия и реплики пользователя. actions содержит итоговые тексты.
export type UserActionsEvent = Omit<UserActionsInputEvent, 'actions'> & {
	actions: (AiDialogueActionItem & { translation?: string })[]
	textReview: {
		originalText: string
		analysis: UserMessagePartCheck
	}[]
}

// Пользователь ушёл от разговора с NPC.
export type UserAvoidsNpcEvent = {
	type: 'userAvoidsNPC'
}

// Событие, не привязанное к конкретному NPC.
export type WorldEvent = {
	type: 'worldEvent'
	content: string
	translation: string
	wordMap?: AiDialogueWordMap
}

/** Результат самостоятельной проверки; создаётся оценщиком, не персонажем и не клиентом. */
export type ExamResultEvent = {
	type: 'examResult'
	/** Последнее сообщение, включённое в проверку. */
	assessedThroughMessageId: number
	/** A0 означает, что в этой попытке A1 не подтверждён; медаль не выдаётся. */
	level: 'A0' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
	summary: string
	strengths: string[]
	errors: {
		messageId: number
		originalText: string
		suggestedText: string
		explanation: string
	}[]
	recommendations: string[]
}

// Любое событие диалога (хранится в AiDialogueMessage.payload).
export type AiDialogueEvent =
	| SceneUpdateEvent
	| HelpEvent
	| NpcActionsEvent
	| UserActionsEvent
	| UserAvoidsNpcEvent
	| WorldEvent
	| ExamResultEvent

// Дискриминатор события.
export type AiDialogueEventType = AiDialogueEvent['type']

// События, которые клиент может отправить серверу (в отличие от AiDialogueEvent —
// сервер сам не генерирует userActions/userAvoidsNPC от имени пользователя).
export type AiDialogueClientEvent = (UserActionsInputEvent | UserAvoidsNpcEvent) & { requestId: string }

// Обёртка сообщения, отдаваемая клиенту (replay и SSE): событие + служебные поля.
export type DialogueServerMessage = {
	id: number
	dialogueId: number
	createdAt: string
	payload: AiDialogueEvent
}

// События SSE-потока (server → client). Обёртка — MessageEvent: { data: AiDialogueStreamEvent }.
//  - message     — одно сохранённое сообщение (replay или только что сгенерированное);
//  - turnStarted — началась фоновая генерация хода: показать «ответ готовится»;
//  - turnDone    — ход завершён (успех или ошибка), можно снова действовать;
//  - turnError   — ход не удался (error — текст ошибки).
export type AiDialogueStreamEvent =
	| { type: 'visualsChanged'; dialogueId: number }
	| { type: 'message'; message: DialogueServerMessage }
	| { type: 'turnStarted' }
	| { type: 'turnDone' }
	| { type: 'turnError'; error: string }
