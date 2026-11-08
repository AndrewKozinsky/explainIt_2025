'use client'

import { useTranslations } from 'next-intl'
import { getAudioAddress } from '@/entities/aiDialogue/audio/dialogueAudioTypes'
import { getReplyTextKey } from '@/entities/aiDialogue/replySettings/replyTextVisibilityStore'
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
import { groupNpcDialogueSpeechAndActions } from './fn/groupNpcDialogueSpeechAndActions'
import NpcRoleText from './NpcRoleText'
import './NpcMessage.scss'

type NpcMessageProps = {
	/** ID сохранённого сообщения; у превью его нет, и кнопка озвучки не показывается. */
	messageId?: number
	previewEventIndex: number
	wordMap?: AiDialogueWordMap
	npcId?: string
	npcName?: string
	npcRole?: string
	emotion?: string
	speechAndActions?: AiDialoguePreviewActionItem[]
	onWordSelect: AiDialogueWordSelectHandler
}

function NpcMessage({
	messageId,
	previewEventIndex,
	npcId,
	npcName = '',
	npcRole = '',
	emotion = '',
	speechAndActions = [],
	onWordSelect,
	wordMap,
}: NpcMessageProps) {
	const t = useTranslations('aiDialogueMessages')
	const content = speechAndActions.map((item, index) => {
		const textProps = {
			content: item.content ?? '',
			translation: item.translation ?? '',
			wordMap: wordMap?.status === 'ready' ? wordMap.blocks[`action:${index}`] : undefined,
			onWordSelect,
		}

		if (item.type !== 'speech') {
			return <NpcActionText key={index} {...textProps} />
		}

		return (
			<AiDialogueContentBlock
				key={index}
				{...textProps}
				replyTextKey={getReplyTextKey(messageId, previewEventIndex, index)}
				audioAddress={getAudioAddress(messageId, index)}
			/>
		)
	})

	return (
		<WithAvatarMessageWrapper
			extraClass='nps-message'
			avatar={<DialogueNpcAvatar npcId={npcId} emotion={emotion} name={npcName || t('participant')} />}
			name={npcName}
			role={npcRole && <NpcRoleText role={npcRole} onWordSelect={onWordSelect} />}
			contentGroups={groupNpcDialogueSpeechAndActions(speechAndActions).map(
				({ key, speechIndex, actionIndex }) => ({
					key,
					speech: speechIndex !== undefined ? content[speechIndex] : undefined,
					actions: actionIndex !== undefined ? content[actionIndex] : undefined,
				}),
			)}
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
