// Статусы сообщения ассистента (совпадают с серверной моделью SentenceChatMessageStatus).
export type ChatMessageStatus = 'streaming' | 'completed' | 'canceled' | 'failed'

// События, которые SSE-endpoint присылает клиенту (см. StreamSentenceChatAssistantCommand на сервере).
export type SseChunkEvent = {
	type: 'chunk'
	chunk: string
}

export type SseDoneEvent = {
	type: 'done'
	status: ChatMessageStatus
	content: string
	errorMessage: null | string
}

export type SseEvent = SseChunkEvent | SseDoneEvent
