import ErrorMessage from 'ui/ErrorMessage/ErrorMessage'
import ChatInput from '../ChatInput/ChatInput'
import MessageList from '../MessageList/MessageList'
import WordsQuickPrompt from '../WordsQuickPrompt/WordsQuickPrompt'
import { useSentenceChat } from './fn/useSentenceChat'
import './SentenceChat.scss'

type SentenceChatProps = {
	sentenceId: number
}

function SentenceChat(props: SentenceChatProps) {
	const { sentenceId } = props

	const { messages, isLoadingThread, isGenerating, threadError, sendQuestion, cancelGeneration } =
		useSentenceChat(sentenceId)

	return (
		<div className='sentence-chat'>
			<div className='sentence-chat__messages'>
				{!isLoadingThread && !threadError && <MessageList messages={messages} />}
				{threadError && <ErrorMessage text={threadError} />}
				<WordsQuickPrompt />
			</div>

			<div className='sentence-chat__input'>
				<ChatInput isGenerating={isGenerating} onSend={sendQuestion} onCancel={cancelGeneration} />
			</div>
		</div>
	)
}

export default SentenceChat
