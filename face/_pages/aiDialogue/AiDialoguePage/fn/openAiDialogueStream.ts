import type { AiDialogueStreamEvent, DialogueServerMessage } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import { useAiDialogueStore } from '../../aiDialogueStore'

export type DialogueAudioStreamHandlers = {
	/**
	 * Новое сохранённое сообщение текущего ответа (не replay истории).
	 * isNewReply — первый озвучиваемый текст этого ответа. Возвращает true, если в сообщении есть такой текст.
	 */
	newMessage: (message: DialogueServerMessage, isNewReply: boolean) => boolean
	disconnect: () => void
}

/**
 * Открывает постоянное SSE-соединение с потоком диалога и разбирает события в стор.
 *
 * Соединение не закрывается по завершении хода — оно живёт, пока открыта страница
 * (см. documentation/aiDialogue/aiDialogue.md). Закрывает его вызывающий код при unmount.
 */

export function openAiDialogueStream(
	dialogueId: number,
	onVisualsChanged?: () => void,
	audio?: DialogueAudioStreamHandlers,
): EventSource {
	const eventSource = new EventSource(buildStreamUrl(dialogueId))
	// Первый озвучиваемый текст нового ответа снимает автоозвучку предыдущего.
	let isAwaitingVoicedReply = false

	eventSource.onopen = function () {
		onVisualsChanged?.()
	}

	eventSource.onmessage = function (event) {
		let parsed: AiDialogueStreamEvent

		try {
			parsed = JSON.parse(event.data) as AiDialogueStreamEvent
		} catch {
			return
		}

		const store = useAiDialogueStore.getState()

		if (parsed.type === 'visualsChanged') {
			if (parsed.dialogueId === dialogueId) onVisualsChanged?.()
			return
		}

		if (parsed.type === 'message') {
			// Получаем только сохранённые сообщения, включая replay истории.
			const isReplay = store.messages.has(parsed.message.id) || !store.isGenerating
			store.upsertMessage(parsed.message)

			if (parsed.message.payload.type === 'npcActions' || parsed.message.payload.type === 'sceneUpdate') {
				onVisualsChanged?.()
			}

			// Replay истории при подключении не озвучивается и не меняет видимость текста.
			if (isReplay) return

			if (audio?.newMessage(parsed.message, isAwaitingVoicedReply)) isAwaitingVoicedReply = false

			return
		}

		if (parsed.type === 'turnStarted') {
			isAwaitingVoicedReply = true
			store.setTurnError(null)
			store.setGenerating(true)
			return
		}

		if (parsed.type === 'turnError') {
			store.setTurnError(parsed.error)
			return
		}

		if (parsed.type === 'turnDone') {
			store.setGenerating(false)

			return
		}
	}

	eventSource.onerror = function () {
		audio?.disconnect()
		// После восстановления соединения сервер отдаст историю. Пока оно оборвано,
		// сбрасываем временное состояние, чтобы не зависло «генерируется».
		useAiDialogueStore.getState().setGenerating(false)
	}

	return eventSource
}

function buildStreamUrl(dialogueId: number): string {
	return `/api/ai-dialogue/${dialogueId}/stream`
}
