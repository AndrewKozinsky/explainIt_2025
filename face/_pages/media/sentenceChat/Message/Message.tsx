import cn from 'classnames'
import StyledMarkdown from 'ui/StyledMarkdown/StyledMarkdown'
import AssistantMessage from '_pages/media/sentenceChat/Message/AssistantMessage'
import GenerationIsCancelled from '_pages/media/sentenceChat/Message/GenerationIsCancelled'
import GenerationIsFailed from '_pages/media/sentenceChat/Message/GenerationIsFailed'
import { ChatUiMessage } from '../types/sseTypes'
import './Message.scss'
import UserMessage from './UserMessage'

type MessageProps = {
	message: ChatUiMessage
}

function Message(props: MessageProps) {
	const { message } = props

	const isAssistant = message.role === 'assistant'
	const isUser = message.role === 'user'

	if (isUser) {
		return <UserMessage message={message.content} />
	}

	const isStreaming = message.status === 'streaming'
	const isFailed = message.status === 'failed'
	const isCanceled = message.status === 'canceled'

	if (isCanceled) {
		return <GenerationIsCancelled />
	}

	if (isFailed) {
		return <GenerationIsFailed errorMessage={message.errorMessage} />
	}

	if (!message.content && isStreaming) {
		return <span className='chat-message__cursor' aria-label='Ассистент печатает' />
	}

	return <AssistantMessage content={message.content} isStreaming={isStreaming} />
}

export default Message
