import { useEffect } from 'react'
import type { SentenceChatThreadOutModel } from '@/shared/api/generated/models'
import { sentenceChatControllerGetThread } from '@/shared/api/generated/sentence-chat/sentence-chat'
import { useSentenceChatStore } from '../../sentenceChatStore'
import { ChatMessageStatus } from '../../types/sseTypes'

export function useLoadChatThread(input: { sentenceId: number; closeStream: () => void }): void {
	const { sentenceId, closeStream } = input

	useEffect(
		function () {
			let cancelled = false
			useSentenceChatStore.getState().clearStoreData()

			sentenceChatControllerGetThread({ sentenceId })
				.then(function (res) {
					if (cancelled) return

					const thread = res as unknown as SentenceChatThreadOutModel | null
					if (thread) {
						useSentenceChatStore.getState().setThreadMessages({
							threadId: thread.id,
							messages: thread.messages.map(function (m) {
								return {
									...m,
									role: m.role as 'user' | 'assistant',
									status: m.status as ChatMessageStatus,
									errorMessage: m.errorMessage as unknown as null | string,
								}
							}),
						})
					} else {
						useSentenceChatStore.getState().updateStore({ isLoadingThread: false })
					}
				})
				.catch(function () {
					if (cancelled) return

					useSentenceChatStore.getState().updateStore({
						threadError: 'Не удалось загрузить историю чата',
						isLoadingThread: false,
					})
				})

			return function () {
				cancelled = true
				closeStream()
			}
		},
		[sentenceId, closeStream],
	)
}
