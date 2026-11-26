import type { AiDialogueExamLevel } from 'features/aiDialogue/aiDialogueLanguageLevel'
import type {
	AiDialogueUserMessageCriticalIssueOutModel,
	AiDialogueUserMessagePartCheckOutModel,
} from 'models/aiDialogue/aiDialogueUserMessageCheck.out.model'
import type { AiDialogueWordMap } from 'types/aiDialogueWordMap'

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

export const aiDialogueEmotions = [
	'neutral',
	'happy',
	'sad',
	'angry',
	'surprised',
	'confused',
	'worried',
	'embarrassed',
	'thoughtful',
	'skeptical',
	'relieved',
	'encouraging',
] as const

export type AiDialogueEmotion = (typeof aiDialogueEmotions)[number]

// Смена сцены — где сейчас находится пользователь.
export type SceneUpdateEvent = {
	type: 'sceneUpdate'
	content: string
	translation: string
	/** Данные иллюстрации; отсутствуют у старых сообщений и в стриминговом превью. */
	visualDescription?: string
	withImage?: boolean
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
	emotion: AiDialogueEmotion
	actions: AiDialogueNpcActionItem[]
	wordMap?: AiDialogueWordMap
}

type UserActionsInputEvent = {
	type: 'userActions'
	actions: AiDialogueActionItem[]
}

export type AiDialogueUserMessageReviewIssue = AiDialogueUserMessageCriticalIssueOutModel & {
	correction?: { replacement: string; kind: 'error' | 'language'; occurrence: number }
}

// Сохранённые действия и реплики пользователя. actions содержит итоговые тексты.
export type UserActionsEvent = Omit<UserActionsInputEvent, 'actions'> & {
	/** Перевод итогового текста. Может отсутствовать в ранее сохранённых сообщениях. */
	actions: (AiDialogueActionItem & { translation?: string })[]
	/** Исходный текст и разбор для каждого элемента actions в том же порядке. */
	textReview?: {
		originalText: string
		analysis: Omit<AiDialogueUserMessagePartCheckOutModel, 'critical'> & {
			critical: AiDialogueUserMessageReviewIssue[]
		}
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
	/** Public medal URL of the original scenario; null for A0 or an unconfigured image. */
	medalUrl: string | null
	/** Последнее сообщение, включённое в проверку. */
	assessedThroughMessageId: number
	/** A0 означает, что в этой попытке A1 не подтверждён; медаль не выдаётся. */
	level: AiDialogueExamLevel
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

// События, которые клиент может отправить серверу (в отличие от AiDialogueEvent —
// сервер сам не генерирует userActions/userAvoidsNPC от имени пользователя).
export type AiDialogueClientEvent = UserActionsInputEvent | UserAvoidsNpcEvent

export type AiDialogueNpcAppearance = {
	npcId: string
	appearance: string
}

export type AiDialogueSceneVisualMetadata = {
	eventIndex: number
	participantNpcIds: string[]
	visualDescription: string
}

export type AiDialogueTurnVisualMetadata = {
	npcAppearances: AiDialogueNpcAppearance[]
	scenes: AiDialogueSceneVisualMetadata[]
}

// Голос нового NPC из скрытой строки voice: сохраняется вместе с ходом и используется озвучкой его реплик.
export type AiDialogueNpcVoice = {
	npcId: string
	voice: import('features/aiDialogue/audio/aiDialogueAudioConfig').DialogueVoice
}

export type ParsedAiDialogueTurn = {
	events: AiDialogueEvent[]
	visualMetadata: AiDialogueTurnVisualMetadata
	npcVoices: AiDialogueNpcVoice[]
}

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
//  - visualsChanged — перечитать визуальный REST-снимок; не является сообщением диалога.
export type AiDialogueStreamEvent =
	| { type: 'visualsChanged'; dialogueId: number }
	| { type: 'message'; message: DialogueServerMessage }
	| { type: 'turnStarted' }
	| { type: 'turnDone' }
	| { type: 'turnError'; error: string }
