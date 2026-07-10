import { useCallback, useEffect, useRef } from 'react'
import type { SentenceChatThreadOutModel, SentenceChatMessageOutModel } from '@/shared/api/generated/models'
import {
	useSentenceChatControllerCreateThread,
	useSentenceChatControllerCreateUserMessage,
} from '@/shared/api/generated/sentence-chat/sentence-chat'
import { useSentenceChatStore } from '../../sentenceChatStore'
import { ChatMessageStatus, ChatUiMessage } from '../../types/sseTypes'
import { openAssistantStream } from './openAssistantStream'
import { useLoadChatThread } from './useLoadChatThread'

export type UseSentenceChatReturn = {
	messages: ChatUiMessage[]
	isLoadingThread: boolean
	isGenerating: boolean
	threadError: null | string
	sendQuestion: (question: string) => Promise<void>
	cancelGeneration: () => void
}

export function useSentenceChat(sentenceId: number): UseSentenceChatReturn {
	const store = useSentenceChatStore()
	const { threadId, messages, isLoadingThread, isGenerating, threadError, llmProvider } = store

	const eventSourceRef = useRef<null | EventSource>(null)
	// Локальный id для streaming-плейсхолдера (до получения финального id от сервера).
	const placeholderIdRef = useRef<number>(-1)

	const { mutateAsync: createThread } = useSentenceChatControllerCreateThread()
	const { mutateAsync: createUserMessage } = useSentenceChatControllerCreateUserMessage()

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

			try {
				let activeThreadId = threadId

				if (activeThreadId === null) {
					const res = await createThread({ data: { sentenceId } })
					const thread = res as unknown as SentenceChatThreadOutModel
					if (!thread?.id) {
						throw new Error('Не удалось создать тред')
					}

					activeThreadId = thread.id
					store.updateStore({ threadId: activeThreadId })
				}

				const userRes = await createUserMessage({
					threadId: activeThreadId,
					data: { threadId: activeThreadId, question: trimmed },
				})
				const userMessage = userRes as unknown as SentenceChatMessageOutModel
				if (!userMessage?.id) {
					throw new Error('Не удалось отправить сообщение')
				}

				store.appendMessage({
					...userMessage,
					role: userMessage.role as 'user' | 'assistant',
					status: userMessage.status as ChatMessageStatus,
					errorMessage: userMessage.errorMessage as unknown as null | string,
				})

				startAssistantStream(activeThreadId)
			} catch {
				store.updateStore({
					threadError: 'Ошибка отправки вопроса',
				})
			}
		},
		[createThread, createUserMessage, isGenerating, startAssistantStream, threadId, store],
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
}
