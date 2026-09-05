import { create } from 'zustand'
import type { DialogueServerMessage } from '@/entities/aiDialogue/types/aiDialogueMessage'
import type { AiDialoguePreviewEvent } from '@/entities/aiDialogue/types/aiDialoguePreview'

/**
 * Состояние страницы диалога с ИИ.
 *
 * - `messages` — сохранённые сообщения (replay + финальные), ключ — id сообщения.
 *   Map используется для дедупликации: при переподключении SSE сервер повторяет
 *   replay, а новое сообщение может прийти параллельно;
 * - `preview` — частичные события текущего хода (из chunk-ов), ещё не сохранённые;
 * - `isGenerating` — идёт ли генерация ответа прямо сейчас;
 * - `turnError` — текст ошибки последнего неудачного хода (событие turnError).
 */
export type AiDialogueStoreValues = {
	messages: Map<number, DialogueServerMessage>
	preview: AiDialoguePreviewEvent[]
	isGenerating: boolean
	turnError: null | string
}

export type AiDialogueStoreMethods = {
	upsertMessage: (message: DialogueServerMessage) => void
	setPreview: (preview: AiDialoguePreviewEvent[]) => void
	setGenerating: (isGenerating: boolean) => void
	setTurnError: (turnError: null | string) => void
	clearStore: () => void
}

const aiDialogueStoreValues: AiDialogueStoreValues = {
	messages: new Map(),
	preview: [],
	isGenerating: false,
	turnError: null,
}

export const useAiDialogueStore = create<AiDialogueStoreValues & AiDialogueStoreMethods>()((set) => ({
	...aiDialogueStoreValues,

	upsertMessage: (message) =>
		set((state) => {
			const messages = new Map(state.messages)
			messages.set(message.id, message)
			return { messages }
		}),

	setPreview: (preview) => set({ preview }),

	setGenerating: (isGenerating) => set({ isGenerating }),

	setTurnError: (turnError) => set({ turnError }),

	clearStore: () => set({ ...aiDialogueStoreValues, messages: new Map() }),
}))
