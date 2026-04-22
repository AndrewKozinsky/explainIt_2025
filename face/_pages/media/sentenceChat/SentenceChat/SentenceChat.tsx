'use client'

import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import LoadingMessage from 'ui/LoadingMessage/LoadingMessage'
import { useUserStore } from '@/stores/userStore'
// import ChatInput from '../ChatInput/ChatInput'
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

	const { messages, isLoadingThread, isGenerating, threadError, sendQuestion, cancelGeneration } =
		useSentenceChat(sentenceId)

	return (
		<div className='sentence-chat'>
			<div className='sentence-chat__messages'>
				{isLoadingThread && <LoadingMessage text='Загрузка…' />}
				{!isLoadingThread && <MessageList messages={messages} />}
				{threadError && <ErrorMessage text={threadError} />}
			</div>

			<div className='sentence-chat__input'>
				{/*<ChatInput
					isGenerating={isGenerating}
					hasBalance={hasBalance}
					onSend={sendQuestion}
					onCancel={cancelGeneration}
				/>*/}
			</div>
		</div>
	)
}

export default SentenceChat
