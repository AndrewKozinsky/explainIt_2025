'use client'

import { KeyboardEvent, useState } from 'react'
import Button from 'ui/formRelated/buttons/Button/Button'
import './ChatInput.scss'

type ChatInputProps = {
	isGenerating: boolean
	hasBalance: boolean
	onSend: (question: string) => void
	onCancel: () => void
}

function ChatInput(props: ChatInputProps) {
	const { isGenerating, hasBalance, onSend, onCancel } = props

	const [value, setValue] = useState<string>('')

	const trimmed = value.trim()
	const canSend = trimmed.length > 0 && hasBalance && !isGenerating

	function handleSend() {
		if (!canSend) return
		onSend(trimmed)
		setValue('')
	}

	function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault()
			handleSend()
		}
	}

	return (
		<div className='chat-input'>
			<textarea
				className='chat-input__textarea'
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder={hasBalance ? 'Задайте вопрос про это предложение…' : 'Недостаточно средств на балансе'}
				rows={2}
				disabled={!hasBalance}
			/>

			<div className='chat-input__actions'>
				{isGenerating ? (
					<Button theme='regular' onClick={onCancel}>
						Остановить
					</Button>
				) : (
					<Button theme='accent' onClick={handleSend} disabled={!canSend}>
						Отправить
					</Button>
				)}
			</div>
		</div>
	)
}

export default ChatInput
