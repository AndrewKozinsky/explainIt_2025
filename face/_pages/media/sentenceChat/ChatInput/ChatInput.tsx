'use client'

import { KeyboardEvent, useRef, useState } from 'react'
import cn from 'classnames'
import { useUserStore } from '@/stores/userStore'
import VoiceInputButton from '../VoiceInputButton/VoiceInputButton'
import ChatInputWarningMessage from './ChatInputWarningMessage'
import { handleEnterToSend } from './fn/handleEnterToSend'
import { computeInsertAtCaret, applyCaret } from './fn/insertAtCaret'
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
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

	const trimmed = prompt.trim()
	const canSend = trimmed.length > 0 && hasBalance && !isGenerating

	function handleSend() {
		if (!canSend) return

		onSend(trimmed)
		setPrompt('')
	}

	function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
		handleEnterToSend(event, handleSend)
	}

	function insertAtCaret(text: string) {
		const el = textAreaRef.current

		setPrompt((prev) => {
			const { next, caret } = computeInsertAtCaret(prev, el as HTMLTextAreaElement | null, text)
			requestAnimationFrame(() => applyCaret(el as HTMLTextAreaElement | null, caret))
			return next
		})
	}

	return (
		<div className={cn('chat-input', isTextAreaFocused && 'chat-input--focus')}>
			<textarea
				ref={textAreaRef}
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
				<div className='chat-input__actions'>
					<VoiceInputButton onInsert={insertAtCaret} disabled={!hasBalance} />
					<SendAndCancelButton
						isGenerating={isGenerating}
						onSend={handleSend}
						onCancel={onCancel}
						prompt={prompt}
					/>
				</div>
			</div>
		</div>
	)
}

export default ChatInput
