import { useEffect, useMemo } from 'react'
import { useReplySettingsStore } from '@/entities/aiDialogue/replySettings/replySettingsStore'
import { useReplyTextVisibilityStore } from '@/entities/aiDialogue/replySettings/replyTextVisibilityStore'
import { useAiDialogueStore } from '../../aiDialogueStore'
import { openAiDialogueStream, type DialogueAudioStreamHandlers } from './openAiDialogueStream'

const FIRST_RECONNECT_DELAY_MS = 1000
const MAX_RECONNECT_DELAY_MS = 15_000

/**
 * Подключает страницу диалога к SSE-потоку и отдаёт нормализованное состояние.
 *
 * Открывает соединение при монтировании (и при смене dialogueId), закрывает при
 * размонтировании. Сообщения возвращает отсортированными по id — в порядке,
 * в котором они появлялись в диалоге.
 */
export function useAiDialogueStream(
	dialogueId: number,
	enabled: boolean = true,
	onVisualsChanged?: () => void,
	audio?: DialogueAudioStreamHandlers,
) {
	useEffect(
		function () {
			if (!enabled) return

			useAiDialogueStore.getState().clearStore()
			useReplyTextVisibilityStore.getState().clear()
			// Настройки читаются до открытия SSE: первые же реплики получают сохранённую видимость текста.
			useReplySettingsStore.getState().loadSettings()
			let connection: EventSource | undefined
			let reconnectTimer: ReturnType<typeof setTimeout> | undefined
			let reconnectDelay = FIRST_RECONNECT_DELAY_MS

			function connect() {
				const stream = openAiDialogueStream(dialogueId, onVisualsChanged, audio)
				connection = stream
				const handleOpen = stream.onopen
				const handleError = stream.onerror

				stream.onopen = (event) => {
					if (stream !== connection) return
					reconnectDelay = FIRST_RECONNECT_DELAY_MS
					handleOpen?.call(stream, event)
				}
				stream.onerror = (event) => {
					if (stream !== connection) return
					handleError?.call(stream, event)

					// После ответа 502 браузер может закрыть EventSource окончательно.
					// Если браузер сам переподключается, сохраняем его текущий поток.
					if (stream.readyState !== EventSource.CLOSED || reconnectTimer !== undefined) return

					reconnectTimer = setTimeout(() => {
						reconnectTimer = undefined
						connect()
					}, reconnectDelay)
					reconnectDelay = Math.min(reconnectDelay * 2, MAX_RECONNECT_DELAY_MS)
				}
			}

			connect()

			return function () {
				clearTimeout(reconnectTimer)
				connection?.close()
				connection = undefined
			}
		},
		[dialogueId, enabled, onVisualsChanged, audio],
	)

	const messages = useAiDialogueStore((state) => state.messages)
	const turnError = useAiDialogueStore((state) => state.turnError)

	const orderedMessages = useMemo(() => [...messages.values()].sort((a, b) => a.id - b.id), [messages])

	return {
		messages: orderedMessages,
		turnError,
	}
}
