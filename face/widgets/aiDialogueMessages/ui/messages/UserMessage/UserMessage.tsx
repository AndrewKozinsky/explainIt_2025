'use client'

import type { AiDialoguePreviewActionItem } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'
import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueContentBlock from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/AiDialogueContentBlock'
import { useDialogueContentSelection } from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/fn/useDialogueContentSelection'
import AiDialogueTextWithTranslation from '@/widgets/aiDialogueMessages/ui/AiDialogueTextWithTranslation/AiDialogueTextWithTranslation'
import DialogueUserAvatar from '../visuals/DialogueUserAvatar'
import { groupDialogueActions } from '../WithAvatarMessageWrapper/fn/groupDialogueActions'
import WithAvatarMessageWrapper from '../WithAvatarMessageWrapper/WithAvatarMessageWrapper'
import './UserMessage.scss'

type UserActionsMessageProps = {
	actions?: AiDialoguePreviewActionItem[]
	onWordSelect: AiDialogueWordSelectHandler
}

function UserMessage({ actions = [], onWordSelect }: UserActionsMessageProps) {
	const content = actions.map((action, index) => {
		const textProps = {
			content: action.content ?? '',
			onWordSelect,
		}

		if (action.type !== 'speech') {
			return <UserActionText key={index} {...textProps} />
		}

		return <AiDialogueContentBlock key={index} {...textProps} />
	})

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

type UserActionTextProps = {
	content: string
	onWordSelect: AiDialogueWordSelectHandler
}

function UserActionText({ content, onWordSelect }: UserActionTextProps) {
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
