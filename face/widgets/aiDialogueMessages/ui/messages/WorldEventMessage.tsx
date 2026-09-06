import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueContentBlock from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/AiDialogueContentBlock'
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
