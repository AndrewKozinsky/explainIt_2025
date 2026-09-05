import type { AiDialoguePreviewActionItem } from '@/entities/aiDialogue/types/aiDialoguePreview'
import type { AiDialogueWordSelectHandler } from '@/entities/aiDialogue/types/aiDialogueUi'
import AiDialogueContentBlock from '../AiDialogueContentBlock/AiDialogueContentBlock'
import './AiDialogueMessages.scss'

type UserActionsMessageProps = {
	actions?: AiDialoguePreviewActionItem[]
	onWordSelect: AiDialogueWordSelectHandler
}

function UserActionsMessage({ actions = [], onWordSelect }: UserActionsMessageProps) {
	return (
		<div className='ai-dialogue-message ai-dialogue-message--user'>
			{actions.map((action, index) => (
				<AiDialogueContentBlock key={index} content={action.content ?? ''} onWordSelect={onWordSelect} />
			))}
		</div>
	)
}

export default UserActionsMessage
