import ErrorMessage from '@/shared/ui/ErrorMessage/ErrorMessage'
import StyledMarkdown from '@/shared/ui/StyledMarkdown/StyledMarkdown'

type UserMessageProps = {
	content: string
	errorMessage: undefined | null | string
	isStreaming: boolean
}

export function AssistantMessage(props: UserMessageProps) {
	const { content, errorMessage, isStreaming } = props

	return (
		<div className='chat-message__assistance'>
			<StyledMarkdown content={content} />
			{errorMessage && <ErrorMessage text={errorMessage} />}
			{isStreaming && <span className='chat-message__cursor' aria-hidden />}
		</div>
	)
}

export default AssistantMessage
