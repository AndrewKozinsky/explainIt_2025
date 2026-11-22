import { useEffect, useRef } from 'react'
import './AiDialogueLeftWrapper.scss'

type AiDialogueLeftWrapperProps = {
	children: [React.ReactNode, React.ReactNode]
	lastMessageId?: number
}

function AiDialogueLeftWrapper(props: AiDialogueLeftWrapperProps) {
	const [messages, input] = props.children
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (props.lastMessageId === undefined) return

		const frame = requestAnimationFrame(() => {
			// Прокручиваем вместе с формой, чтобы она не перекрывала последнее сообщение.
			containerRef.current?.scrollIntoView({
				block: 'end',
				behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
			})
		})

		return () => cancelAnimationFrame(frame)
	}, [props.lastMessageId])

	return (
		<div ref={containerRef} className='ai-dialogue-left-wrapper'>
			<div className='ai-dialogue-left-wrapper__messages'>{messages}</div>
			{input && <div className='ai-dialogue-left-wrapper__input'>{input}</div>}
		</div>
	)
}

export default AiDialogueLeftWrapper
