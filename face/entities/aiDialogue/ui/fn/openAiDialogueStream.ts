import { parseAiDialoguePreview } from '@/entities/aiDialogue/lib/parseAiDialoguePreview'
import type { AiDialogueStreamEvent } from '@/entities/aiDialogue/types/aiDialogueMessage'
import { useAiDialogueStore } from '../aiDialogueStore'

/**
 * Открывает постоянное SSE-соединение с потоком диалога и разбирает события в стор.
 *
 * Соединение не закрывается по завершении хода — оно живёт, пока открыта страница
 * (см. aiDocsRus/topics/aiDialogue.md). Закрывает его вызывающий код при unmount.
 */
export function openAiDialogueStream(dialogueId: number): EventSource {
	const eventSource = new EventSource(buildStreamUrl(dialogueId))
	let accumulated = ''

	eventSource.onmessage = function (event) {
		let parsed: AiDialogueStreamEvent

		try {
			parsed = JSON.parse(event.data) as AiDialogueStreamEvent
		} catch {
			return
		}

		const store = useAiDialogueStore.getState()

		if (parsed.type === 'message') {
			// Финализированное сообщение заменяет превью текущего хода.
			store.upsertMessage(parsed.message)
			store.setPreview([])
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
			const preview = parseAiDialoguePreview(accumulated)
			if (preview !== null) {
				store.setPreview(preview)
			}
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
