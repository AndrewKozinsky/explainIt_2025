import Message from '../Message/Message'
import { ChatUiMessage } from '../types/sseTypes'
import './MessageList.scss'

type MessageListProps = {
	messages: ChatUiMessage[]
}

function MessageList(props: MessageListProps) {
	const { messages } = props

	if (!messages.length) {
		return null
	}

	return (
		<div className='chat-message-list'>
			{messages.map((m) => (
				<Message key={m.id} message={m} />
			))}
		</div>
	)
}

export default MessageList
