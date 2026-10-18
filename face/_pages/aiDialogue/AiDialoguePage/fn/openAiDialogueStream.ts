import type { DialogueAudioEvent, DialogueAudioTarget } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import { getCompletedAudioTargets } from '@/entities/aiDialogue/audio/getCompletedAudioTargets'
import type { AiDialogueStreamEvent } from '@/widgets/aiDialogueMessages/types/aiDialogueMessage'
import { parseAiDialoguePreview } from '_pages/aiDialogue/AiDialoguePage/fn/parseAiDialoguePreview'
import { useAiDialogueStore } from '../../aiDialogueStore'

/**
 * Открывает постоянное SSE-соединение с потоком диалога и разбирает события в стор.
 *
 * Соединение не закрывается по завершении хода — оно живёт, пока открыта страница
 * (см. aiDocsRus/topics/aiDialogues.md). Закрывает его вызывающий код при unmount.
 */
export type DialogueAudioStreamHandlers = {
	event: (event: DialogueAudioEvent) => void
	targets: (attemptId: string, targets: DialogueAudioTarget[]) => void
	refresh: () => void
	disconnect: () => void
}

export function openAiDialogueStream(
	dialogueId: number,
	onVisualsChanged?: () => void,
	audio?: DialogueAudioStreamHandlers,
): EventSource {
	const eventSource = new EventSource(buildStreamUrl(dialogueId))
	let accumulated = ''
	let attemptId: string | undefined

	eventSource.onopen = function () {
		onVisualsChanged?.()
		audio?.refresh()
	}

	eventSource.onmessage = function (event) {
		let parsed: AiDialogueStreamEvent

		try {
			parsed = JSON.parse(event.data) as AiDialogueStreamEvent
		} catch {
			return
		}

		const store = useAiDialogueStore.getState()

		if (parsed.type.startsWith('audio')) {
			const event = parsed as DialogueAudioEvent
			if (event.dialogueId !== dialogueId) return
			if (event.type === 'audioAttemptStarted') attemptId = event.attemptId
			audio?.event(event)
			return
		}

		if (parsed.type === 'visualsChanged') {
			if (parsed.dialogueId === dialogueId) onVisualsChanged?.()
			return
		}

		if (parsed.type === 'message') {
			// Финализированное сообщение заменяет превью текущего хода.
			store.upsertMessage(parsed.message)
			audio?.refresh()
			store.setPreview([])

			if (parsed.message.payload.type === 'npcActions' || parsed.message.payload.type === 'sceneUpdate') {
				onVisualsChanged?.()
			}

			return
		}

		if (parsed.type === 'turnStarted') {
			// Генерация хода началась (до первого chunk): показываем «ответ готовится».
			// Сбрасываем превью и ошибку прошлого хода — как это делает первый chunk.
			accumulated = ''
			store.setPreview([])
			store.setTurnError(null)
			store.setGenerating(true)
			return
		}

		if (parsed.type === 'chunk') {
			if (!store.isGenerating) {
				// Начало нового хода — сбрасываем текст предыдущего и его ошибку.
				accumulated = ''
				store.setTurnError(null)
				store.setGenerating(true)
			}

			accumulated += parsed.chunk
			if (attemptId) audio?.targets(attemptId, getCompletedAudioTargets(accumulated))
			const preview = parseAiDialoguePreview(accumulated)
			if (preview !== null) {
				store.setPreview(preview)
			}
			return
		}

		if (parsed.type === 'turnReset') {
			if (attemptId) audio?.disconnect()
			attemptId = undefined
			// Сервер начал повторную попытку генерации: выбрасываем превью неудачной
			// попытки, но isGenerating остаётся true — новый стрим уже идёт.
			accumulated = ''
			store.setPreview([])
			return
		}

		if (parsed.type === 'turnError') {
			store.setTurnError(parsed.error)
			return
		}

		if (parsed.type === 'turnDone') {
			if (attemptId) {
				audio?.targets(attemptId, getCompletedAudioTargets(accumulated + '\n'))
			}

			audio?.refresh()
			accumulated = ''
			store.setPreview([])
			store.setGenerating(false)

			return
		}
	}

	eventSource.onerror = function () {
		audio?.disconnect()
		attemptId = undefined
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
