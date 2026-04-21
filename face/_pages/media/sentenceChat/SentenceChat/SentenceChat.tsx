'use client'

import { useUserStore } from '@/stores/userStore'
import ChatInput from '../ChatInput/ChatInput'
import MessageList from '../MessageList/MessageList'
import { useSentenceChat } from './fn/useSentenceChat'
import './SentenceChat.scss'

type SentenceChatProps = {
	sentenceId: number
}

function SentenceChat(props: SentenceChatProps) {
	const { sentenceId } = props

	const user = useUserStore((s) => s.user)
	const hasBalance = (user?.balance ?? 0) > 0

	const { messages, isLoadingThread, isGenerating, error, sendQuestion, cancelGeneration } =
		useSentenceChat(sentenceId)

	return (
		<div className='sentence-chat'>
			<div className='sentence-chat__messages'>
				{isLoadingThread ? (
					<p className='sentence-chat__status'>Загрузка…</p>
				) : (
					<MessageList messages={messages} />
				)}
				{error && <p className='sentence-chat__error'>{error}</p>}
			</div>

			<div className='sentence-chat__input'>
				<ChatInput
					isGenerating={isGenerating}
					hasBalance={hasBalance}
					onSend={sendQuestion}
					onCancel={cancelGeneration}
				/>
			</div>
		</div>
	)
}

export default SentenceChat
