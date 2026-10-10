import type { AiDialoguePreviewActionItem } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'
import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueContentBlock from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/AiDialogueContentBlock'
import DialogueAvatar from '../visuals/DialogueAvatar'
import './AiDialogueMessages.scss'

type UserActionsMessageProps = {
	actions?: AiDialoguePreviewActionItem[]
	onWordSelect: AiDialogueWordSelectHandler
}

function UserActionsMessage({ actions = [], onWordSelect }: UserActionsMessageProps) {
	const content = actions.map((action, index) => (
		<AiDialogueContentBlock key={index} content={action.content ?? ''} onWordSelect={onWordSelect} />
	))

	return (
		<div className='ai-dialogue-message ai-dialogue-message--user'>
			<DialogueAvatar name='Вы' isUser />
			<div className='ai-dialogue-message__body'>
				<div className='ai-dialogue-message__npc-header'>
					<span className='ai-dialogue-message__npc-name'>Вы</span>
				</div>
				{content}
			</div>
		</div>
	)
}

export default UserActionsMessage
