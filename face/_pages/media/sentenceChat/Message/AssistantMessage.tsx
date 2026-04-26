import StyledMarkdown from 'ui/StyledMarkdown/StyledMarkdown'

type UserMessageProps = {
	content: string
	isStreaming: boolean
}

export function AssistantMessage(props: UserMessageProps) {
	const { content, isStreaming } = props

	return (
		<div className='chat-message__assistance'>
			<StyledMarkdown content={content} />
			{isStreaming && <span className='chat-message__cursor' aria-hidden />}
		</div>
	)
}

export default AssistantMessage
