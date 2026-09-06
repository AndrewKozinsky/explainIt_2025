import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueContentBlock from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/AiDialogueContentBlock'
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
