import { LlmProvider, useSentenceChatStore } from '../../sentenceChatStore'
import { SseEvent } from '../../types/sseTypes'

export function openAssistantStream(input: {
	threadId: number
	placeholderId: number
	provider: LlmProvider
	onClose: () => void
}): EventSource {
	const { threadId, placeholderId, provider, onClose } = input

	const eventSource = new EventSource(buildSseUrl(threadId, provider))

	eventSource.onmessage = function (event) {
		let parsed: SseEvent

		try {
			parsed = JSON.parse(event.data) as SseEvent
		} catch {
			return
		}

		const store = useSentenceChatStore.getState()

		if (parsed.type === 'chunk') {
			store.appendStreamChunk({ messageId: placeholderId, chunk: parsed.chunk })
			return
		}

		if (parsed.type === 'done') {
			store.finalizeStreamingMessage({
				messageId: placeholderId,
				content: parsed.content,
				status: parsed.status,
				errorMessage: parsed.errorMessage,
			})

			onClose()
		}
	}

	eventSource.onerror = function () {
		// Сеть оборвалась или сервер закрыл соединение без done.
		// Оставляем уже полученный текст, помечаем как failed.
		useSentenceChatStore.getState().failStreamingMessages('Соединение потеряно')
		onClose()
	}

	return eventSource
}

function buildSseUrl(threadId: number, provider: LlmProvider): string {
	return `/api/sentence-chat/threads/${threadId}/assistant-stream?provider=${provider}`
}
