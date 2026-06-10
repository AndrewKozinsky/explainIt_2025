import { useCallback, useEffect, useRef } from 'react'
import {
	useSentence_Chat_Create_Thread,
	useSentence_Chat_Create_User_Message,
	useSentence_Chat_Get_ThreadLazyQuery,
} from '@/graphql'
import { getTextByUnknownError } from '@/utils/errorMessages'
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

	const [getThread] = useSentence_Chat_Get_ThreadLazyQuery({ fetchPolicy: 'network-only' })
	const [createThread] = useSentence_Chat_Create_Thread()
	const [createUserMessage] = useSentence_Chat_Create_User_Message()

	const closeStream = useCallback(function () {
		eventSourceRef.current?.close()
		eventSourceRef.current = null
	}, [])

	useLoadChatThread({ sentenceId, getThread, closeStream })

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
					const res = await createThread({ variables: { input: { sentenceId } } })
					const thread = res.data?.sentence_chat_create_thread
					if (!thread) {
						throw new Error('Не удалось создать тред')
					}

					activeThreadId = thread.id
					store.updateStore({ threadId: activeThreadId })
				}

				const userRes = await createUserMessage({
					variables: { input: { threadId: activeThreadId, question: trimmed } },
				})
				const userMessage = userRes.data?.sentence_chat_create_user_message
				if (!userMessage) {
					throw new Error('Не удалось отправить сообщение')
				}

				store.appendMessage({
					...userMessage,
					role: userMessage.role as 'user' | 'assistant',
					status: userMessage.status as ChatMessageStatus,
				})

				startAssistantStream(activeThreadId)
			} catch (err: unknown) {
				store.updateStore({
					threadError: getTextByUnknownError(err, 'Ошибка отправки вопроса'),
				})
			}
		},
		[createThread, createUserMessage, isGenerating, sentenceId, startAssistantStream, threadId, store],
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
