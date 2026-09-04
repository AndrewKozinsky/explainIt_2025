/**
 * Типы событий ролевого диалога с ИИ (AiDialogue).
 *
 * Одно событие = одна строка в таблице AiDialogueMessage. Все события имеют
 * дискриминатор `type`. Поля `id`, `dialogueId` и `createdAt` в событие НЕ входят —
 * их назначает сервер при сохранении в БД и добавляет в обёртку DialogueServerMessage.
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
	newScene: string
	translation: string
}

// Подсказка, что следует сделать пользователю (если NPC не может обратиться напрямую).
export type HelpEvent = {
	type: 'help'
	help: string
	translation: string
}

// Действия и реплики NPC.
export type NpcActionsEvent = {
	type: 'npcActions'
	npcId: string
	npcName: string
	npcRole: string
	emotion: string
	actions: AiDialogueNpcActionItem[]
}

// Действия и реплики пользователя.
export type UserActionsEvent = {
	type: 'userActions'
	actions: AiDialogueActionItem[]
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
}

// Любое событие диалога (хранится в AiDialogueMessage.payload).
export type AiDialogueEvent =
	| SceneUpdateEvent
	| HelpEvent
	| NpcActionsEvent
	| UserActionsEvent
	| UserAvoidsNpcEvent
	| WorldEvent

// События, которые клиент может отправить серверу (в отличие от AiDialogueEvent —
// сервер сам не генерирует userActions/userAvoidsNPC от имени пользователя).
export type AiDialogueClientEvent = UserActionsEvent | UserAvoidsNpcEvent

// Обёртка сообщения, отдаваемая клиенту (replay и SSE): событие + служебные поля.
export type DialogueServerMessage = {
	id: number
	dialogueId: number
	createdAt: string
	payload: AiDialogueEvent
}

// События SSE-потока (server → client). Обёртка — MessageEvent: { data: AiDialogueStreamEvent }.
//  - message   — одно сохранённое сообщение (replay или только что сгенерированное);
//  - chunk     — сырой текстовый фрагмент ответа LLM (для превью через partial-json);
//  - turnDone  — ход завершён (успех или ошибка), можно снова действовать;
//  - turnError — ход не удался (error — текст ошибки).
export type AiDialogueStreamEvent =
	| { type: 'message'; message: DialogueServerMessage }
	| { type: 'chunk'; chunk: string }
	| { type: 'turnDone' }
	| { type: 'turnError'; error: string }
