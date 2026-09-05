import type { AiDialogueWordSelectHandler } from '@/entities/aiDialogue/types/aiDialogueUi'
import AiDialogueContentBlock from '../AiDialogueContentBlock/AiDialogueContentBlock'
import './AiDialogueMessages.scss'

type HelpMessageProps = {
	content?: string
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
}

function HelpMessage({ content = '', translation = '', onWordSelect }: HelpMessageProps) {
	return (
		<div className='ai-dialogue-message ai-dialogue-message--help'>
			<span className='ai-dialogue-message__label'>Подсказка</span>
			<AiDialogueContentBlock content={content} translation={translation} onWordSelect={onWordSelect} />
		</div>
	)
}

export default HelpMessage
