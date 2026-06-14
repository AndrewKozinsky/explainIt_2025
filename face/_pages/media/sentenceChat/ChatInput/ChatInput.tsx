'use client'

import { useRef } from 'react'
import cn from 'classnames'
import LlmProviderSwitch from '../LlmProviderSwitch/LlmProviderSwitch'
import PromptTextarea, { PromptTextareaHandle } from '../PromptTextarea/PromptTextarea'
import SendAndCancelButtons from '../SendAndCancelButtons/SendAndCancelButtons'
import { useSentenceChatStore } from '../sentenceChatStore'
import VoiceInputButton from '../VoiceInputButton/VoiceInputButton'
import ChatInputWarningMessage from './ChatInputWarningMessage'
import './ChatInput.scss'

type ChatInputProps = {
	isGenerating: boolean
	onSend: (question: string) => void
	onCancel: () => void
}

function ChatInput(props: ChatInputProps) {
	const { isGenerating, onSend, onCancel } = props

	const isTextAreaFocused = useSentenceChatStore((s) => s.isTextAreaFocused)

	const promptTextareaRef = useRef<PromptTextareaHandle>(null)

	return (
		<div className={cn('chat-input', isTextAreaFocused && 'chat-input--focus')}>
			<PromptTextarea ref={promptTextareaRef} onSend={onSend} />
			<div className='chat-input__bottom'>
				<div>
					<ChatInputWarningMessage />
					<LlmProviderSwitch />
				</div>
				<div className='chat-input__actions'>
					<VoiceInputButton onInsert={(text) => promptTextareaRef.current?.insertAtCaret(text)} />
					<SendAndCancelButtons
						isGenerating={isGenerating}
						onSend={() => promptTextareaRef.current?.submit()}
						onCancel={onCancel}
					/>
				</div>
			</div>
		</div>
	)
}

export default ChatInput
