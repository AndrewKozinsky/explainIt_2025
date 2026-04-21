import { useEffect, useRef } from 'react'
import Message from '../Message/Message'
import { ChatUiMessage } from '../types/sseTypes'
import './MessageList.scss'

type MessageListProps = {
	messages: ChatUiMessage[]
}

function MessageList(props: MessageListProps) {
	const { messages } = props

	const bottomRef = useRef<HTMLDivElement>(null)

	// Последний чанк streaming-сообщения меняет content → пересчитывается высота → скроллим.
	const lastMessage = messages[messages.length - 1]
	const scrollTrigger = `${messages.length}:${lastMessage?.content.length ?? 0}`

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ block: 'end' })
	}, [scrollTrigger])

	if (messages.length === 0) {
		return (
			<div className='chat-message-list chat-message-list--empty'>
				<p className='chat-message-list__placeholder'>Задайте первый вопрос про это предложение.</p>
			</div>
		)
	}

	return (
		<div className='chat-message-list'>
			{messages.map((m) => (
				<Message key={m.id} message={m} />
			))}
			<div ref={bottomRef} />
		</div>
	)
}

export default MessageList
