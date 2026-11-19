import './AiDialogueLeftWrapper.scss'

type AiDialogueLeftWrapperProps = {
	children: [React.ReactNode, React.ReactNode]
}

function AiDialogueLeftWrapper(props: AiDialogueLeftWrapperProps) {
	const [messages, input] = props.children

	return (
		<div className='ai-dialogue-left-wrapper'>
			<div className='ai-dialogue-left-wrapper__messages'>{messages}</div>
			<div className='ai-dialogue-left-wrapper__input'>{input}</div>
		</div>
	)
}

export default AiDialogueLeftWrapper
