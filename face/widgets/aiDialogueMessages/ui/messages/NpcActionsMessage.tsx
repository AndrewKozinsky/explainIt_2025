import type { DialogueAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import type { AiDialoguePreviewActionItem } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'
import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import type { AiDialogueWordMap } from '@/widgets/aiDialogueMessages/types/aiDialogueWordMap'
import AiDialogueContentBlock from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/AiDialogueContentBlock'
import DialogueAvatar from './visuals/DialogueAvatar'
import './AiDialogueMessages.scss'

type NpcActionsMessageProps = {
	audioAddress: Omit<DialogueAudioAddress, 'actionIndex'>
	wordMap?: AiDialogueWordMap
	npcId?: string
	npcName?: string
	npcRole?: string
	emotion?: string
	actions?: AiDialoguePreviewActionItem[]
	onWordSelect: AiDialogueWordSelectHandler
}

function NpcActionsMessage({
	audioAddress,
	npcId,
	npcName = '',
	npcRole = '',
	emotion = '',
	actions = [],
	onWordSelect,
	wordMap,
}: NpcActionsMessageProps) {
	const content = actions.map((action, index) => (
		<AiDialogueContentBlock
			audioAddress={action.type === 'speech' ? { ...audioAddress, actionIndex: index } : undefined}
			wordMap={wordMap?.status === 'ready' ? wordMap.blocks[`action:${index}`] : undefined}
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
