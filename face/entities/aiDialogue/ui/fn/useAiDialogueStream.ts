import { useEffect, useMemo, useRef } from 'react'
import { useAiDialogueStore } from '../aiDialogueStore'
import { openAiDialogueStream } from './openAiDialogueStream'

/**
 * Подключает страницу диалога к SSE-потоку и отдаёт нормализованное состояние.
 *
 * Открывает соединение при монтировании (и при смене dialogueId), закрывает при
 * размонтировании. Сообщения возвращает отсортированными по id — в порядке,
 * в котором они появлялись в диалоге.
 */
export function useAiDialogueStream(dialogueId: number, enabled: boolean = true) {
	const eventSourceRef = useRef<null | EventSource>(null)

	useEffect(
		function () {
			if (!enabled) return

			useAiDialogueStore.getState().clearStore()
			eventSourceRef.current = openAiDialogueStream(dialogueId)

			return function () {
				eventSourceRef.current?.close()
				eventSourceRef.current = null
			}
		},
		[dialogueId, enabled],
	)

	const messages = useAiDialogueStore((state) => state.messages)
	const preview = useAiDialogueStore((state) => state.preview)
	const isGenerating = useAiDialogueStore((state) => state.isGenerating)
	const turnError = useAiDialogueStore((state) => state.turnError)

	const orderedMessages = useMemo(() => [...messages.values()].sort((a, b) => a.id - b.id), [messages])

	return {
		messages: orderedMessages,
		preview,
		isGenerating,
		turnError,
	}
}
