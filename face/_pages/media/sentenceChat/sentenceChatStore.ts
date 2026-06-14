import { produce } from 'immer'
import { create } from 'zustand'
import { ChatMessageStatus, ChatUiMessage } from './types/sseTypes'

export const sentenceChatStoreValues: SentenceChatStoreValues = {
	threadId: null,
	messages: [],
	isLoadingThread: true,
	isGenerating: false,
	threadError: null,
	llmProvider: 'gemini',
	prompt: '',
	isTextAreaFocused: false,
}

export const useSentenceChatStore = create<SentenceChatStoreNext>()((set) => {
	return {
		...sentenceChatStoreValues,
		clearStoreData: () => {
			set(sentenceChatStoreValues)
		},
		updateStore: (storePart: Partial<SentenceChatStoreValues>) => {
			set(storePart)
		},
		setThreadMessages: (input: { threadId: number; messages: ChatUiMessage[] }) => {
			set({
				threadId: input.threadId,
				messages: input.messages,
				isLoadingThread: false,
				threadError: null,
			})
		},
		appendMessage: (message: ChatUiMessage) => {
			set(
				produce((state: SentenceChatStoreNext) => {
					state.messages.push(message)
				}),
			)
		},
		appendStreamChunk: (input: { messageId: number; chunk: string }) => {
			set(
				produce((state: SentenceChatStoreNext) => {
					const msg = state.messages.find((m) => m.id === input.messageId)
					if (!msg) return

					msg.content += input.chunk
				}),
			)
		},
		finalizeStreamingMessage: (input: {
			messageId: number
			content: string
			status: ChatMessageStatus
			errorMessage: null | string
		}) => {
			set(
				produce((state: SentenceChatStoreNext) => {
					const msg = state.messages.find((m) => m.id === input.messageId)
					if (!msg) return

					msg.content = input.content
					msg.status = input.status
					msg.errorMessage = input.errorMessage
					msg.isLocalPlaceholder = false

					state.isGenerating = false
				}),
			)
		},
		cancelStreamingMessages: () => {
			set(
				produce((state: SentenceChatStoreNext) => {
					for (const msg of state.messages) {
						if (msg.status === 'streaming') {
							msg.status = 'canceled'
						}
					}

					state.isGenerating = false
				}),
			)
		},
		failStreamingMessages: (errorMessage: string) => {
			set(
				produce((state: SentenceChatStoreNext) => {
					for (const msg of state.messages) {
						if (msg.status === 'streaming') {
							msg.status = 'failed'
							msg.errorMessage = errorMessage
						}
					}

					state.isGenerating = false
				}),
			)
		},
		setLlmProvider: (provider: LlmProvider) => {
			set({ llmProvider: provider })
		},
		setPrompt: (prompt: string) => {
			set({ prompt })
		},
		setIsTextAreaFocused: (isTextAreaFocused: boolean) => {
			set({ isTextAreaFocused })
		},
	}
})

export type LlmProvider = 'gemini' | 'chatgpt' | 'deepseek'

export type SentenceChatStoreNext = SentenceChatStoreValues & SentenceChatStoreMethods

export type SentenceChatStoreValues = {
	threadId: null | number
	messages: ChatUiMessage[]
	isLoadingThread: boolean
	isGenerating: boolean
	threadError: null | string
	llmProvider: LlmProvider
	prompt: string
	isTextAreaFocused: boolean
}

export type SentenceChatStoreMethods = {
	clearStoreData: () => void
	updateStore: (storePart: Partial<SentenceChatStoreValues>) => void
	setThreadMessages: (input: { threadId: number; messages: ChatUiMessage[] }) => void
	appendMessage: (message: ChatUiMessage) => void
	appendStreamChunk: (input: { messageId: number; chunk: string }) => void
	finalizeStreamingMessage: (input: {
		messageId: number
		content: string
		status: ChatMessageStatus
		errorMessage: null | string
	}) => void
	cancelStreamingMessages: () => void
	failStreamingMessages: (errorMessage: string) => void
	setLlmProvider: (provider: LlmProvider) => void
	setPrompt: (prompt: string) => void
	setIsTextAreaFocused: (isTextAreaFocused: boolean) => void
}
