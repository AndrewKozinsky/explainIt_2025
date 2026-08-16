import { useEffect, useRef } from 'react'
import { SentenceChatApi } from '@/entities/sentenceChat/repository/SentenceChatApi'
import { useSentenceChatStore } from '../../sentenceChatStore'
import { ChatMessageStatus } from '../../types/sseTypes'

const sentenceChatApi = new SentenceChatApi()

export function useLoadChatThread(input: { sentenceId: number; closeStream: () => void }): void {
	const { sentenceId, closeStream } = input

	const apiRef = useRef(sentenceChatApi)
	const { getThread } = apiRef.current

	useEffect(
		function () {
			let cancelled = false
			useSentenceChatStore.getState().clearStoreData()

			getThread(sentenceId).then(function (result) {
				if (cancelled) return

				if (result.error || result.errors) {
					useSentenceChatStore.getState().updateStore({
						threadError: 'Не удалось загрузить историю чата',
						isLoadingThread: false,
					})
					return
				}

				const thread = result.data
				if (thread) {
					useSentenceChatStore.getState().setThreadMessages({
						threadId: thread.id,
						messages: thread.messages.map(function (m) {
							return {
								...m,
								role: m.role as 'user' | 'assistant',
								status: m.status as ChatMessageStatus,
								errorMessage: m.errorMessage,
							}
						}),
					})
				} else {
					useSentenceChatStore.getState().updateStore({ isLoadingThread: false })
				}
			})

			return function () {
				cancelled = true
				closeStream()
			}
		},
		[sentenceId, closeStream, getThread],
	)
}
