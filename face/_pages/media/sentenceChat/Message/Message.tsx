import cn from 'classnames'
// import StyledMarkdown from 'ui/StyledMarkdown/StyledMarkdown'
import { ChatUiMessage } from '../types/sseTypes'
import './Message.scss'

type MessageProps = {
	message: ChatUiMessage
}

function Message(props: MessageProps) {
	const { message } = props

	const isAssistant = message.role === 'assistant'
	const isUser = message.role === 'user'

	const isStreaming = message.status === 'streaming'
	const isFailed = message.status === 'failed'
	const isCanceled = message.status === 'canceled'

	return (
		<div className={cn('chat-message', `chat-message--role-${message.role}`)}>
			{/*<div className='chat-message__bubble'>
				{isAssistant && renderAssistantContent(message.content, isStreaming)}
				{isUser && <p>{message.content}</p>}

				{isAssistant && isFailed && (
					<p className='chat-message__status-text chat-message__status-text--error'>
						Ошибка: {message.errorMessage ?? 'не удалось получить ответ'}
					</p>
				)}
				{isAssistant && isCanceled && <p className='chat-message__status-text'>Генерация остановлена.</p>}
			</div>*/}
		</div>
	)
}

/*function renderAssistantContent(content: string, isStreaming: boolean) {
	if (!content && isStreaming) {
		return <span className='chat-message__cursor' aria-label='Ассистент печатает' />
	}

	return (
		<>
			<StyledMarkdown content={content} />
			{isStreaming && <span className='chat-message__cursor' aria-hidden />}
		</>
	)
}*/

export default Message
