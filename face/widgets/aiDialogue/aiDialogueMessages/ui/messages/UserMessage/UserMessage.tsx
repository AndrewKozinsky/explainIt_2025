'use client'

import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import type { UserActionsEvent } from '@/widgets/aiDialogue/aiDialogueMessages/types/aiDialogueMessage'
import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogue/aiDialogueMessages/types/aiDialogueUi'
import { useDialogueContentSelection } from '@/widgets/aiDialogue/aiDialogueMessages/ui/AiDialogueContentBlock/fn/useDialogueContentSelection'
import AiDialogueTextWithTranslation from '@/widgets/aiDialogue/aiDialogueMessages/ui/AiDialogueTextWithTranslation/AiDialogueTextWithTranslation'
import { groupDialogueActions } from '../WithAvatarMessageWrapper/fn/groupDialogueActions'
import WithAvatarMessageWrapper from '../WithAvatarMessageWrapper/WithAvatarMessageWrapper'
import DialogueUserAvatar from './DialogueUserAvatar'
import './UserMessage.scss'

type UserActionsMessageProps = {
	reviewButton?: ReactNode
	actions?: UserActionsEvent['actions']
	onWordSelect: AiDialogueWordSelectHandler
}

function UserMessage({ actions = [], onWordSelect, reviewButton }: UserActionsMessageProps) {
	const t = useTranslations('aiDialogueMessages')
	const content = actions.map((action, index) => (
		<UserMessageText
			key={index}
			content={action.content ?? ''}
			translation={action.translation}
			onWordSelect={onWordSelect}
		/>
	))

	return (
		<WithAvatarMessageWrapper
			extraClass='user-message'
			avatar={<DialogueUserAvatar name={t('you')} />}
			name={t('you')}
			headerAction={reviewButton}
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
	translation?: string
	onWordSelect: AiDialogueWordSelectHandler
}

function UserMessageText({ content, translation, onWordSelect }: UserMessageTextProps) {
	const { isTranslationVisible, handleWordClick } = useDialogueContentSelection({ content, onWordSelect })

	return (
		<AiDialogueTextWithTranslation
			content={content}
			translation={translation}
			translationTone='muted'
			isTranslationVisible={isTranslationVisible}
			onWordClick={handleWordClick}
		/>
	)
}

export default UserMessage
