import type { AiDialogueWordSelectHandler } from '@/entities/aiDialogue/types/aiDialogueUi'
import AiDialogueContentBlock from '../AiDialogueContentBlock/AiDialogueContentBlock'
import './AiDialogueMessages.scss'

type SceneUpdateMessageProps = {
	content?: string
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
}

function SceneUpdateMessage({ content = '', translation = '', onWordSelect }: SceneUpdateMessageProps) {
	return (
		<div className='ai-dialogue-message ai-dialogue-message--scene-update'>
			<span className='ai-dialogue-message__label'>Смена сцены</span>
			<AiDialogueContentBlock content={content} translation={translation} onWordSelect={onWordSelect} />
		</div>
	)
}

export default SceneUpdateMessage
