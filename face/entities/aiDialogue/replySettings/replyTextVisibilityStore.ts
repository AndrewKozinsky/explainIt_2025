import { create } from 'zustand'

const PREVIEW_KEY_PREFIX = 'preview:'

/**
 * Видимость текста каждой показанной реплики или описания сцены. Живёт в памяти, пока открыта страница.
 *
 * Реплика получает видимость по текущему значению «Текст реплик», когда появляется на экране.
 * Переключатель меняет только видимость будущих реплик. Скрытую реплику можно открыть, обратно она не скрывается.
 * Ключ сохранённой реплики — `${messageId}:${actionIndex}`, реплики превью — `preview:${eventIndex}:${actionIndex}`.
 */
type ReplyTextVisibilityStore = {
	isVisibleByKey: ReadonlyMap<string, boolean>
	/** Запоминает видимость реплики при её появлении; уже известную реплику не меняет. */
	registerReply: (replyKey: string, isVisible: boolean) => void
	revealReply: (replyKey: string) => void
	/** Сохранённое сообщение заменило событие превью: его реплики сохраняют видимость, выбранную в превью. */
	movePreviewReplies: (previewEventIndex: number, messageId: number) => void
	/** Превью отброшено (новая попытка или новый ход): его реплики больше не на экране. */
	clearPreviewReplies: () => void
	clear: () => void
}

export function getReplyTextKey(messageId: number | undefined, previewEventIndex: number, actionIndex: number) {
	return messageId === undefined
		? `${PREVIEW_KEY_PREFIX}${previewEventIndex}:${actionIndex}`
		: `${messageId}:${actionIndex}`
}

export const useReplyTextVisibilityStore = create<ReplyTextVisibilityStore>()((set) => ({
	isVisibleByKey: new Map(),

	registerReply: (replyKey, isVisible) =>
		set((state) => {
			if (state.isVisibleByKey.has(replyKey)) return state
			return { isVisibleByKey: new Map(state.isVisibleByKey).set(replyKey, isVisible) }
		}),

	revealReply: (replyKey) =>
		set((state) => ({ isVisibleByKey: new Map(state.isVisibleByKey).set(replyKey, true) })),

	movePreviewReplies: (previewEventIndex, messageId) =>
		set((state) => {
			const previewEventPrefix = `${PREVIEW_KEY_PREFIX}${previewEventIndex}:`
			const isVisibleByKey = new Map(state.isVisibleByKey)

			for (const [replyKey, isVisible] of state.isVisibleByKey) {
				if (!replyKey.startsWith(previewEventPrefix)) continue

				const actionIndex = replyKey.slice(previewEventPrefix.length)
				isVisibleByKey.set(`${messageId}:${actionIndex}`, isVisible)
				isVisibleByKey.delete(replyKey)
			}

			return { isVisibleByKey }
		}),

	clearPreviewReplies: () =>
		set((state) => ({
			isVisibleByKey: new Map(
				[...state.isVisibleByKey].filter(([replyKey]) => !replyKey.startsWith(PREVIEW_KEY_PREFIX)),
			),
		})),

	clear: () => set({ isVisibleByKey: new Map() }),
}))
