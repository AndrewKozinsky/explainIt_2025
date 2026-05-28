// Статусы сообщения ассистента (совпадают с серверной моделью SentenceChatMessageStatus).
// import { SentenceChatMessageOutModel } from 'graphql'

// export type ChatMessageStatus = 'streaming' | 'completed' | 'canceled' | 'failed'

// События, которые SSE-endpoint присылает клиенту (см. StreamSentenceChatAssistantCommand на сервере).
/*export type SseChunkEvent = {
	type: 'chunk'
	chunk: string
}*/

/*export type SseDoneEvent = {
	type: 'done'
	status: ChatMessageStatus
	content: string
	errorMessage: null | string
}*/

// export type SseEvent = SseChunkEvent | SseDoneEvent

// Локальное представление сообщения в UI. Расширяем серверную модель, чтобы было удобно
// хранить promise-placeholder ассистент-сообщения до того, как мы узнали его реальный id.
/*export type ChatUiMessage = Omit<SentenceChatMessageOutModel, 'role' | 'status'> & {
	role: 'user' | 'assistant'
	status: ChatMessageStatus
	// true — это локальная streaming-заготовка, ещё не подтверждённая сервером.
	isLocalPlaceholder?: boolean
}*/
