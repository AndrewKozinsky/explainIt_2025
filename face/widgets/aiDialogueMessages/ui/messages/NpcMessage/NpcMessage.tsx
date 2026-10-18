'use client'

import type { DialogueAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import type { AiDialoguePreviewActionItem } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'
import type {
	AiDialogueTextMappingProps,
	AiDialogueWordSelectHandler,
} from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import type { AiDialogueWordMap } from '@/widgets/aiDialogueMessages/types/aiDialogueWordMap'
import AiDialogueContentBlock from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/AiDialogueContentBlock'
import { useDialogueContentSelection } from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/fn/useDialogueContentSelection'
import AiDialogueTextWithTranslation from '@/widgets/aiDialogueMessages/ui/AiDialogueTextWithTranslation/AiDialogueTextWithTranslation'
import WithAvatarMessageWrapper from '../WithAvatarMessageWrapper/WithAvatarMessageWrapper'
import DialogueNpcAvatar from './DialogueNpcAvatar'
import { groupNpcDialogueActions } from './fn/groupNpcDialogueActions'
import './NpcMessage.scss'

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

function NpcMessage({
	audioAddress,
	npcId,
	npcName = '',
	npcRole = '',
	emotion = '',
	actions = [],
	onWordSelect,
	wordMap,
}: NpcActionsMessageProps) {
	const content = actions.map((action, index) => {
		const textProps = {
			content: action.content ?? '',
			translation: action.translation ?? '',
			wordMap: wordMap?.status === 'ready' ? wordMap.blocks[`action:${index}`] : undefined,
			onWordSelect,
		}

		if (action.type !== 'speech') {
			return <NpcActionText key={index} {...textProps} />
		}

		return (
			<AiDialogueContentBlock key={index} {...textProps} audioAddress={{ ...audioAddress, actionIndex: index }} />
		)
	})

	return (
		<WithAvatarMessageWrapper
			extraClass='nps-message'
			avatar={<DialogueNpcAvatar npcId={npcId} emotion={emotion} name={npcName || 'Участник'} />}
			name={npcName}
			role={npcRole}
			contentGroups={groupNpcDialogueActions(actions).map(({ key, speechIndex, actionIndex }) => ({
				key,
				speech: speechIndex !== undefined ? content[speechIndex] : undefined,
				actions: actionIndex !== undefined ? content[actionIndex] : undefined,
			}))}
		/>
	)
}

type NpcActionTextProps = AiDialogueTextMappingProps & {
	content: string
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
}

function NpcActionText({ content, translation, wordMap, onWordSelect }: NpcActionTextProps) {
	const { isTranslationVisible, handleWordClick } = useDialogueContentSelection({ content, wordMap, onWordSelect })

	return (
		<AiDialogueTextWithTranslation
			content={content}
			translation={translation}
			wordMap={wordMap}
			isTranslationVisible={isTranslationVisible}
			onWordClick={handleWordClick}
		/>
	)
}

export default NpcMessage
