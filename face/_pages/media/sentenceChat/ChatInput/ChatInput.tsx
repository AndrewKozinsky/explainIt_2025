'use client'

import { useRef } from 'react'
import cn from 'classnames'
import ContainerWidthObserver from 'ui/ContainerWidthObserver/ContainerWidthObserver'
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
			<ContainerWidthObserver extraClass='chat-input__bottom' widths={[380]}>
				{(containerWidthRangeIndex) => {
					return (
						<>
							<div>
								<ChatInputWarningMessage />
								<LlmProviderSwitch smallIcons={containerWidthRangeIndex === 1} />
							</div>
							<div className='chat-input__actions'>
								<VoiceInputButton onInsert={(text) => promptTextareaRef.current?.insertAtCaret(text)} />
								<SendAndCancelButtons
									isGenerating={isGenerating}
									onSend={() => promptTextareaRef.current?.submit()}
									onCancel={onCancel}
								/>
							</div>
						</>
					)
				}}
			</ContainerWidthObserver>
		</div>
	)
}

export default ChatInput
