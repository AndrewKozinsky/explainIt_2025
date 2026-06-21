import { useEffect } from 'react'
import { getTextByUnknownError } from 'utils/extractErrorText'
import { useSentence_Chat_Get_ThreadLazyQuery } from '@/graphql'
import { useSentenceChatStore } from '../../sentenceChatStore'
import { ChatMessageStatus } from '../../types/sseTypes'

type GetThreadFn = ReturnType<typeof useSentence_Chat_Get_ThreadLazyQuery>[0]

export function useLoadChatThread(input: {
	sentenceId: number
	getThread: GetThreadFn
	closeStream: () => void
}): void {
	const { sentenceId, getThread, closeStream } = input

	useEffect(
		function () {
			let cancelled = false
			useSentenceChatStore.getState().clearStoreData()

			getThread({ variables: { input: { sentenceId } } })
				.then(function (res) {
					if (cancelled) return

					const thread = res.data?.sentence_chat_get_thread
					if (thread) {
						useSentenceChatStore.getState().setThreadMessages({
							threadId: thread.id,
							messages: thread.messages.map(function (m) {
								return {
									...m,
									role: m.role as 'user' | 'assistant',
									status: m.status as ChatMessageStatus,
								}
							}),
						})
					} else {
						useSentenceChatStore.getState().updateStore({ isLoadingThread: false })
					}
				})
				.catch(function (err: unknown) {
					if (cancelled) return

					useSentenceChatStore.getState().updateStore({
						threadError: getTextByUnknownError(err),
						isLoadingThread: false,
					})
				})

			return function () {
				cancelled = true
				closeStream()
			}
		},
		[sentenceId, getThread, closeStream],
	)
}
