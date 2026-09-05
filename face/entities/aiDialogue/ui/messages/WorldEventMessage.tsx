import type { AiDialogueWordSelectHandler } from '@/entities/aiDialogue/types/aiDialogueUi'
import AiDialogueContentBlock from '../AiDialogueContentBlock/AiDialogueContentBlock'
import './AiDialogueMessages.scss'

type WorldEventMessageProps = {
	content?: string
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
}

function WorldEventMessage({ content = '', translation = '', onWordSelect }: WorldEventMessageProps) {
	return (
		<div className='ai-dialogue-message ai-dialogue-message--world-event'>
			<span className='ai-dialogue-message__label'>Событие</span>
			<AiDialogueContentBlock content={content} translation={translation} onWordSelect={onWordSelect} />
		</div>
	)
}

export default WorldEventMessage
