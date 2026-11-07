import { useEffect } from 'react'
import { useReplySettingsStore } from '@/entities/aiDialogue/replySettings/replySettingsStore'
import { useReplyTextVisibilityStore } from '@/entities/aiDialogue/replySettings/replyTextVisibilityStore'

/**
 * Видимость текста реплики. При появлении реплика получает текущее значение «Текст реплик»
 * и дальше не зависит от переключателя. Скрытый текст открывается вручную и обратно не скрывается.
 */
export function useReplyTextVisibility(replyKey: string) {
	const isReplyTextVisible = useReplySettingsStore((state) => state.isReplyTextVisible)
	const registeredVisibility = useReplyTextVisibilityStore((state) => state.isVisibleByKey.get(replyKey))
	const registerReply = useReplyTextVisibilityStore((state) => state.registerReply)
	const revealReply = useReplyTextVisibilityStore((state) => state.revealReply)

	useEffect(
		function () {
			registerReply(replyKey, useReplySettingsStore.getState().isReplyTextVisible)
		},
		[registerReply, replyKey],
	)

	return {
		isTextVisible: registeredVisibility ?? isReplyTextVisible,
		revealText: () => revealReply(replyKey),
	}
}
