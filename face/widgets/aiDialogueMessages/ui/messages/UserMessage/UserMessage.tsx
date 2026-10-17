import type { AiDialoguePreviewActionItem } from '@/widgets/aiDialogueMessages/types/aiDialoguePreview'
import type { AiDialogueWordSelectHandler } from '@/widgets/aiDialogueMessages/types/aiDialogueUi'
import AiDialogueContentBlock from '@/widgets/aiDialogueMessages/ui/AiDialogueContentBlock/AiDialogueContentBlock'
import DialogueAvatar from '../visuals/DialogueAvatar'
import WithAvatarMessageWrapper from '../WithAvatarMessageWrapper/WithAvatarMessageWrapper'
import './UserMessage.scss'

type UserActionsMessageProps = {
	actions?: AiDialoguePreviewActionItem[]
	onWordSelect: AiDialogueWordSelectHandler
}

function UserMessage({ actions = [], onWordSelect }: UserActionsMessageProps) {
	const content = actions.map((action, index) => (
		<AiDialogueContentBlock key={index} content={action.content ?? ''} onWordSelect={onWordSelect} />
	))

	return (
		<WithAvatarMessageWrapper
			extraClass='user-message'
			avatar={<DialogueAvatar name='Вы' isUser />}
			name='Вы'
			actions={content.filter((_, index) => actions[index].type !== 'speech')}
			speech={content.filter((_, index) => actions[index].type === 'speech')}
		/>
	)
}

export default UserMessage
