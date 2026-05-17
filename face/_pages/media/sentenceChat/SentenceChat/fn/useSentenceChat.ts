'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
	useSentence_Chat_Create_Thread,
	useSentence_Chat_Create_User_Message,
	useSentence_Chat_Get_ThreadLazyQuery,
} from '@/graphql'
import { getTextByUnknownError } from '@/utils/errorMessages'
import { ChatMessageStatus, ChatUiMessage, SseEvent } from '../../types/sseTypes'

export type UseSentenceChatReturn = {
	messages: ChatUiMessage[]
	isLoadingThread: boolean
	isGenerating: boolean
	threadError: null | string
	sendQuestion: (question: string) => Promise<void>
	cancelGeneration: () => void
}

export function useSentenceChat(sentenceId: number): UseSentenceChatReturn {
	const [threadId, setThreadId] = useState<null | number>(null)
	const [messages, setMessages] = useState<ChatUiMessage[]>([])
	const [isLoadingThread, setIsLoadingThread] = useState<boolean>(true)
	const [isGenerating, setIsGenerating] = useState<boolean>(false)
	const [threadError, setThreadThreadError] = useState<null | string>(null)

	const eventSourceRef = useRef<null | EventSource>(null)
	// Локальный id для streaming-плейсхолдера (до получения финального id от сервера).
	const placeholderIdRef = useRef<number>(-1)

	const [getThread] = useSentence_Chat_Get_ThreadLazyQuery({ fetchPolicy: 'network-only' })
	const [createThread] = useSentence_Chat_Create_Thread()
	const [createUserMessage] = useSentence_Chat_Create_User_Message()

	const closeStream = useCallback(() => {
		eventSourceRef.current?.close()
		eventSourceRef.current = null
	}, [])

	// Загрузка треда при монтировании и при смене sentenceId.
	useEffect(() => {
		let cancelled = false
		setIsLoadingThread(true)
		setThreadThreadError(null)
		setMessages([])
		setThreadId(null)

		getThread({ variables: { input: { sentenceId } } })
			.then((res) => {
				if (cancelled) return
				const thread = res.data?.sentence_chat_get_thread
				if (thread) {
					setThreadId(thread.id)
					setMessages(
						thread.messages.map((m) => ({
							...m,
							role: m.role as 'user' | 'assistant',
							status: m.status as ChatMessageStatus,
						})),
					)
				}
			})
			.catch((err: unknown) => {
				if (cancelled) return
				setThreadThreadError(getTextByUnknownError(err, 'Не удалось загрузить ветку диалога'))
			})
			.finally(() => {
				if (!cancelled) setIsLoadingThread(false)
			})

		return () => {
			cancelled = true
			closeStream()
		}
	}, [sentenceId, getThread, closeStream])

	// ---- SSE ----

	const startAssistantStream = useCallback(
		(activeThreadId: number) => {
			closeStream()

			// Локальный плейсхолдер ассистент-ответа: появится в UI сразу, а реальный id
			// узнаем только из done-события / следующего обновления треда.
			const placeholderId = placeholderIdRef.current--
			setMessages((prev) => [
				...prev,
				{
					id: placeholderId,
					threadId: activeThreadId,
					role: 'assistant',
					content: '',
					status: 'streaming',
					errorMessage: null,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					isLocalPlaceholder: true,
				},
			])

			const eventSource = new EventSource(buildSseUrl(activeThreadId))
			eventSourceRef.current = eventSource
			setIsGenerating(true)

			eventSource.onmessage = (event) => {
				let parsed: SseEvent
				try {
					parsed = JSON.parse(event.data) as SseEvent
				} catch {
					return
				}

				if (parsed.type === 'chunk') {
					setMessages((prev) =>
						prev.map((m) => (m.id === placeholderId ? { ...m, content: m.content + parsed.chunk } : m)),
					)
					return
				}

				if (parsed.type === 'done') {
					setMessages((prev) =>
						prev.map((message) =>
							message.id === placeholderId
								? {
										...message,
										content: parsed.content,
										status: parsed.status,
										errorMessage: parsed.errorMessage,
										isLocalPlaceholder: false,
									}
								: message,
						),
					)
					setIsGenerating(false)
					closeStream()
				}
			}

			eventSource.onerror = () => {
				// Сеть оборвалась или сервер закрыл соединение без done.
				// Оставляем уже полученный текст, помечаем как failed.
				setMessages((prev) =>
					prev.map((m) =>
						m.id === placeholderId && m.status === 'streaming'
							? { ...m, status: 'failed', errorMessage: 'Соединение потеряно' }
							: m,
					),
				)

				setIsGenerating(false)
				closeStream()
			}
		},
		[closeStream],
	)

	// ---- Отправка вопроса ----

	const sendQuestion = useCallback(
		async (question: string) => {
			const trimmed = question.trim()
			if (!trimmed || isGenerating) return

			setThreadThreadError(null)

			try {
				let activeThreadId = threadId

				if (activeThreadId === null) {
					const res = await createThread({ variables: { input: { sentenceId } } })
					const thread = res.data?.sentence_chat_create_thread
					if (!thread) {
						throw new Error('Не удалось создать тред')
					}

					activeThreadId = thread.id
					setThreadId(activeThreadId)
				}

				const userRes = await createUserMessage({
					variables: { input: { threadId: activeThreadId, question: trimmed } },
				})
				const userMessage = userRes.data?.sentence_chat_create_user_message
				if (!userMessage) {
					throw new Error('Не удалось отправить сообщение')
				}

				setMessages((prev) => [
					...prev,
					{
						...userMessage,
						role: userMessage.role as 'user' | 'assistant',
						status: userMessage.status as ChatMessageStatus,
					},
				])

				startAssistantStream(activeThreadId)
			} catch (err: unknown) {
				setThreadThreadError(getTextByUnknownError(err, 'Ошибка отправки вопроса'))
			}
		},
		[createThread, createUserMessage, isGenerating, sentenceId, startAssistantStream, threadId],
	)

	const cancelGeneration = useCallback(() => {
		if (!isGenerating) return
		// Закрываем EventSource — сервер через teardown Observable сам запишет canceled в БД.
		closeStream()
		setMessages((prev) => prev.map((m) => (m.status === 'streaming' ? { ...m, status: 'canceled' } : m)))
		setIsGenerating(false)
	}, [closeStream, isGenerating])

	// Страховка на unmount.
	useEffect(() => {
		return () => {
			closeStream()
		}
	}, [closeStream])

	return {
		messages,
		isLoadingThread,
		isGenerating,
		threadError: threadError,
		sendQuestion,
		cancelGeneration,
	}
}

function buildSseUrl(threadId: number) {
	return `/api/sentence-chat/threads/${threadId}/assistant-stream`
}
