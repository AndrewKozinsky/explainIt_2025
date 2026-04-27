'use client'

import { KeyboardEvent, useState } from 'react'
import cn from 'classnames'
import { useUserStore } from '@/stores/userStore'
import ChatInputWarningMessage from './ChatInputWarningMessage'
import SendAndCancelButton from './SendAndCancelButton'
import './ChatInput.scss'

type ChatInputProps = {
	isGenerating: boolean
	onSend: (question: string) => void
	onCancel: () => void
}

function ChatInput(props: ChatInputProps) {
	const { isGenerating, onSend, onCancel } = props

	const user = useUserStore((s) => s.user)
	const hasBalance = (user?.balance ?? 0) > 0

	const [prompt, setPrompt] = useState<string>('')
	const [isTextAreaFocused, setIsTextAreaFocused] = useState<boolean>(false)

	const trimmed = prompt.trim()
	const canSend = trimmed.length > 0 && hasBalance && !isGenerating

	function handleSend() {
		if (!canSend) return

		onSend(trimmed)
		setPrompt('')
	}

	function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault()
			handleSend()
		}
	}

	return (
		<div className={cn('chat-input', isTextAreaFocused && 'chat-input--focus')}>
			<textarea
				className='chat-input__textarea'
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				onKeyDown={handleKeyDown}
				onFocus={() => setIsTextAreaFocused(true)}
				onBlur={() => setIsTextAreaFocused(false)}
				placeholder='Любой вопрос про предложение: грамматика, смысл, похожие конструкции…'
				rows={2}
				disabled={!hasBalance}
			/>
			<div className='chat-input__bottom'>
				<ChatInputWarningMessage />
				<SendAndCancelButton
					isGenerating={isGenerating}
					onSend={handleSend}
					onCancel={onCancel}
					prompt={prompt}
				/>
			</div>
		</div>
	)
}

export default ChatInput
