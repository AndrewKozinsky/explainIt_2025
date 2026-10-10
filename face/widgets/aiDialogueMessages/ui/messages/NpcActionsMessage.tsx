import type { AiDialoguePreviewActionItem } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'
import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueContentBlock from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/AiDialogueContentBlock'
import DialogueAvatar from '../visuals/DialogueAvatar'
import './AiDialogueMessages.scss'

type NpcActionsMessageProps = {
	npcId?: string
	npcName?: string
	npcRole?: string
	emotion?: string
	actions?: AiDialoguePreviewActionItem[]
	onWordSelect: AiDialogueWordSelectHandler
}

function NpcActionsMessage({
	npcId,
	npcName = '',
	npcRole = '',
	emotion = '',
	actions = [],
	onWordSelect,
}: NpcActionsMessageProps) {
	const content = actions.map((action, index) => (
		<AiDialogueContentBlock
			key={index}
			content={action.content ?? ''}
			translation={action.translation ?? ''}
			onWordSelect={onWordSelect}
		/>
	))

	return (
		<div className='ai-dialogue-message ai-dialogue-message--npc'>
			<DialogueAvatar npcId={npcId} emotion={emotion} name={npcName || 'Участник'} />
			<div className='ai-dialogue-message__body'>
				<div className='ai-dialogue-message__npc-header'>
					{npcName && <span className='ai-dialogue-message__npc-name'>{npcName}</span>}
					{npcRole && <span className='ai-dialogue-message__npc-role'>{npcRole}</span>}
				</div>

				{content}
			</div>
		</div>
	)
}

export default NpcActionsMessage
