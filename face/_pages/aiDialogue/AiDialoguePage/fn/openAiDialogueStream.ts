import { useReplyTextVisibilityStore } from '@/entities/aiDialogue/replySettings/replyTextVisibilityStore'
import type { AiDialogueStreamEvent, DialogueServerMessage } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import { parseAiDialoguePreview } from '_pages/aiDialogue/AiDialoguePage/fn/parseAiDialoguePreview'
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
	let accumulated = ''
	// Ждём первый озвучиваемый текст нового ответа: он снимает автоозвучку предыдущего.
	let isAwaitingVoicedReply = false
	// Номер сохранённого сообщения в текущем ходе: оно заменяет событие превью с тем же номером.
	let turnMessageIndex = 0

	function startTurn() {
		accumulated = ''
		isAwaitingVoicedReply = true
		turnMessageIndex = 0
		useReplyTextVisibilityStore.getState().clearPreviewReplies()
	}

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
			// Финализированное сообщение заменяет превью текущего хода.
			const isReplay = store.messages.has(parsed.message.id) || !store.isGenerating
			store.upsertMessage(parsed.message)
			store.setPreview([])

			if (parsed.message.payload.type === 'npcActions' || parsed.message.payload.type === 'sceneUpdate') {
				onVisualsChanged?.()
			}

			// Replay истории при подключении не озвучивается и не меняет видимость текста.
			if (isReplay) return

			// Открытый в превью текст остаётся открытым в сохранённом сообщении.
			useReplyTextVisibilityStore.getState().movePreviewReplies(turnMessageIndex, parsed.message.id)
			turnMessageIndex += 1

			if (audio?.newMessage(parsed.message, isAwaitingVoicedReply)) isAwaitingVoicedReply = false

			return
		}

		if (parsed.type === 'turnStarted') {
			// Генерация хода началась (до первого chunk): показываем «ответ готовится».
			// Сбрасываем превью и ошибку прошлого хода — как это делает первый chunk.
			startTurn()
			store.setPreview([])
			store.setTurnError(null)
			store.setGenerating(true)
			return
		}

		if (parsed.type === 'chunk') {
			if (!store.isGenerating) {
				// Начало нового хода — сбрасываем текст предыдущего и его ошибку.
				startTurn()
				store.setTurnError(null)
				store.setGenerating(true)
			}

			accumulated += parsed.chunk
			const preview = parseAiDialoguePreview(accumulated)
			if (preview !== null) {
				store.setPreview(preview)
			}
			return
		}

		if (parsed.type === 'turnReset') {
			// Сервер начал повторную попытку генерации: выбрасываем превью неудачной
			// попытки, но isGenerating остаётся true — новый стрим уже идёт.
			accumulated = ''
			turnMessageIndex = 0
			useReplyTextVisibilityStore.getState().clearPreviewReplies()
			store.setPreview([])

			return
		}

		if (parsed.type === 'turnError') {
			store.setTurnError(parsed.error)
			return
		}

		if (parsed.type === 'turnDone') {
			accumulated = ''
			store.setPreview([])
			store.setGenerating(false)

			return
		}
	}

	eventSource.onerror = function () {
		audio?.disconnect()
		// EventSource переподключится сам и сервер отдаст replay. Пока соединение
		// оборвано — сбрасываем transient-состояние, чтобы не зависло «генерируется».
		accumulated = ''
		useAiDialogueStore.getState().setPreview([])
		useAiDialogueStore.getState().setGenerating(false)
	}

	return eventSource
}

function buildStreamUrl(dialogueId: number): string {
	return `/api/ai-dialogue/${dialogueId}/stream`
}
