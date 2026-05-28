// import AssistantMessage from '_pages/media/sentenceChat/Message/AssistantMessage'
// import GenerationIsCancelled from '_pages/media/sentenceChat/Message/GenerationIsCancelled'
// import { ChatUiMessage } from '../types/sseTypes'
// import UserMessage from './UserMessage'
// import './Message.scss'

/*type MessageProps = {
	message: ChatUiMessage
}*/

/*function Message(props: MessageProps) {
	const { message } = props

	const isUser = message.role === 'user'

	if (isUser) {
		return <UserMessage message={message.content} />
	}

	// Assistant message

	const isStreaming = message.status === 'streaming'
	const isCanceled = message.status === 'canceled'

	if (isCanceled) {
		return <GenerationIsCancelled />
	}

	if (!message.content && isStreaming) {
		return <span className='chat-message__cursor' aria-label='Ассистент печатает' />
	}

	return <AssistantMessage content={message.content} errorMessage={message.errorMessage} isStreaming={isStreaming} />
}*/

// export default Message
