import type { AiDialoguePreviewActionItem } from '@/entities/aiDialogue/types/aiDialoguePreview'
import type { AiDialogueWordSelectHandler } from '@/entities/aiDialogue/types/aiDialogueUi'
import AiDialogueContentBlock from '../AiDialogueContentBlock/AiDialogueContentBlock'
import './AiDialogueMessages.scss'

type NpcActionsMessageProps = {
	npcName?: string
	npcRole?: string
	emotion?: string
	actions?: AiDialoguePreviewActionItem[]
	onWordSelect: AiDialogueWordSelectHandler
}

function NpcActionsMessage({
	npcName = '',
	npcRole = '',
	emotion = '',
	actions = [],
	onWordSelect,
}: NpcActionsMessageProps) {
	return (
		<div className='ai-dialogue-message ai-dialogue-message--npc'>
			<div className='ai-dialogue-message__npc-header'>
				{npcName && <span className='ai-dialogue-message__npc-name'>{npcName}</span>}
				{npcRole && <span className='ai-dialogue-message__npc-role'>{npcRole}</span>}
				{emotion && <span className='ai-dialogue-message__npc-emotion'>{emotion}</span>}
			</div>

			{actions.map((action, index) => (
				<AiDialogueContentBlock
					key={index}
					content={action.content ?? ''}
					translation={action.translation ?? ''}
					onWordSelect={onWordSelect}
				/>
			))}
		</div>
	)
}

export default NpcActionsMessage
