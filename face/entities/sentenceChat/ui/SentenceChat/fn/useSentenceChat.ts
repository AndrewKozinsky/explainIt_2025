// import { useCallback, useEffect, useRef } from 'react'
// import { sentenceChatApi } from '@/entities/sentenceChat/repository/SentenceChatApi'
// import { useSentenceChatStore } from '../../sentenceChatStore'
// import { ChatMessageStatus, ChatUiMessage } from '../../types/sseTypes'
// import { openAssistantStream } from './openAssistantStream'
// import { useLoadChatThread } from './useLoadChatThread'

/*export type UseSentenceChatReturn = {
	messages: ChatUiMessage[]
	isLoadingThread: boolean
	isGenerating: boolean
	threadError: null | string
	sendQuestion: (question: string) => Promise<void>
	cancelGeneration: () => void
}*/

/*export function useSentenceChat(sentenceId: number): UseSentenceChatReturn {
	const store = useSentenceChatStore()
	const { threadId, messages, isLoadingThread, isGenerating, threadError, llmProvider } = store

	const eventSourceRef = useRef<null | EventSource>(null)
	const placeholderIdRef = useRef<number>(-1)

	const closeStream = useCallback(function () {
		eventSourceRef.current?.close()
		eventSourceRef.current = null
	}, [])

	useLoadChatThread({ sentenceId, closeStream })

	// ---- SSE ----

	const startAssistantStream = useCallback(
		function (activeThreadId: number) {
			closeStream()

			const placeholderId = placeholderIdRef.current--

			store.appendMessage({
				id: placeholderId,
				threadId: activeThreadId,
				role: 'assistant',
				content: '',
				status: 'streaming',
				errorMessage: null,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
				isLocalPlaceholder: true,
			})
			store.updateStore({ isGenerating: true })

			eventSourceRef.current = openAssistantStream({
				threadId: activeThreadId,
				placeholderId,
				provider: llmProvider,
				onClose: closeStream,
			})
		},
		[closeStream, store, llmProvider],
	)

	// ---- Отправка вопроса ----
	const sendQuestion = useCallback(
		async function (question: string) {
			const trimmed = question.trim()
			if (!trimmed || isGenerating) return

			store.updateStore({ threadError: null })

			let activeThreadId = threadId

			if (activeThreadId === null) {
				const res = await sentenceChatApi.createThread(sentenceId)
				if (res.error || res.errors) {
					store.updateStore({ threadError: 'Ошибка отправки вопроса' })
					return
				}
				const thread = res.data
				activeThreadId = thread.id
				store.updateStore({ threadId: activeThreadId })
			}

			const userRes = await sentenceChatApi.createUserMessage(activeThreadId, trimmed)
			if (userRes.error || userRes.errors) {
				store.updateStore({ threadError: 'Ошибка отправки вопроса' })
				return
			}
			const userMessage = userRes.data

			store.appendMessage({
				...userMessage,
				role: userMessage.role as 'user' | 'assistant',
				status: userMessage.status as ChatMessageStatus,
				errorMessage: userMessage.errorMessage,
			})

			startAssistantStream(activeThreadId)
		},
		[isGenerating, startAssistantStream, threadId, store],
	)

	const cancelGeneration = useCallback(
		function () {
			if (!isGenerating) return
			// Закрываем EventSource — сервер через teardown Observable сам запишет canceled в БД.
			closeStream()
			store.cancelStreamingMessages()
		},
		[closeStream, isGenerating, store],
	)

	// Страховка на unmount.
	useEffect(
		function () {
			return function () {
				closeStream()
			}
		},
		[closeStream],
	)

	return {
		messages,
		isLoadingThread,
		isGenerating,
		threadError: threadError,
		sendQuestion,
		cancelGeneration,
	}
}*/
