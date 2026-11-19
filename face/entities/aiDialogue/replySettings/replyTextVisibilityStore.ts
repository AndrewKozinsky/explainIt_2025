import { create } from 'zustand'

/**
 * Видимость текста каждой показанной реплики или описания сцены. Живёт в памяти, пока открыта страница.
 *
 * Реплика получает видимость по текущему значению «Текст реплик», когда появляется на экране.
 * Переключатель меняет только видимость будущих реплик. Скрытую реплику можно открыть, обратно она не скрывается.
 * Ключ реплики — `${messageId}:${actionIndex}`.
 */
type ReplyTextVisibilityStore = {
	isVisibleByKey: ReadonlyMap<string, boolean>
	/** Запоминает видимость реплики при её появлении; уже известную реплику не меняет. */
	registerReply: (replyKey: string, isVisible: boolean) => void
	revealReply: (replyKey: string) => void
	clear: () => void
}

export function getReplyTextKey(messageId: number, actionIndex: number) {
	return `${messageId}:${actionIndex}`
}

export const useReplyTextVisibilityStore = create<ReplyTextVisibilityStore>()((set) => ({
	isVisibleByKey: new Map(),

	registerReply: (replyKey, isVisible) =>
		set((state) => {
			if (state.isVisibleByKey.has(replyKey)) return state
			return { isVisibleByKey: new Map(state.isVisibleByKey).set(replyKey, isVisible) }
		}),

	revealReply: (replyKey) => set((state) => ({ isVisibleByKey: new Map(state.isVisibleByKey).set(replyKey, true) })),

	clear: () => set({ isVisibleByKey: new Map() }),
}))
