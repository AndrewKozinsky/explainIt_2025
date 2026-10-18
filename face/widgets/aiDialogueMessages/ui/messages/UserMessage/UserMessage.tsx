'use client'

import type { AiDialoguePreviewActionItem } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'
import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import { useDialogueContentSelection } from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/fn/useDialogueContentSelection'
import AiDialogueTextWithTranslation from '@/widgets/aiDialogueMessages/ui/AiDialogueTextWithTranslation/AiDialogueTextWithTranslation'
import { groupDialogueActions } from '../WithAvatarMessageWrapper/fn/groupDialogueActions'
import WithAvatarMessageWrapper from '../WithAvatarMessageWrapper/WithAvatarMessageWrapper'
import DialogueUserAvatar from './DialogueUserAvatar'
import './UserMessage.scss'

type UserActionsMessageProps = {
	actions?: AiDialoguePreviewActionItem[]
	onWordSelect: AiDialogueWordSelectHandler
}

function UserMessage({ actions = [], onWordSelect }: UserActionsMessageProps) {
	const content = actions.map((action, index) => (
		<UserMessageText key={index} content={action.content ?? ''} onWordSelect={onWordSelect} />
	))

	return (
		<WithAvatarMessageWrapper
			extraClass='user-message'
			avatar={<DialogueUserAvatar name='You' />}
			name='You'
			contentGroups={groupDialogueActions(actions).map(({ key, speechIndex, actionIndex }) => ({
				key,
				speech: speechIndex !== undefined ? content[speechIndex] : undefined,
				actions: actionIndex !== undefined ? content[actionIndex] : undefined,
			}))}
		/>
	)
}

type UserMessageTextProps = {
	content: string
	onWordSelect: AiDialogueWordSelectHandler
}

function UserMessageText({ content, onWordSelect }: UserMessageTextProps) {
	const { isTranslationVisible, handleWordClick } = useDialogueContentSelection({ content, onWordSelect })

	return (
		<AiDialogueTextWithTranslation
			content={content}
			isTranslationVisible={isTranslationVisible}
			onWordClick={handleWordClick}
		/>
	)
}

export default UserMessage
