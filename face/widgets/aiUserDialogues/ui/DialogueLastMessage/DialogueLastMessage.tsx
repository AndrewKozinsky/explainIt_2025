import cn from 'classnames'
import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'
import DotSeparator from '@/shared/ui/DotSeparator/DotSeparator'
import './DialogueLastMessage.scss'

export default function DialogueLastMessage({ message }: { message: AiDialogueListItemModel['lastMessage'] }) {
	if (!message) {
		return <p className='ai-dialogue-card__message ai-dialogue-card__no-message'>Пока нет сообщений персонажей.</p>
	}

	return (
		<div className='ai-dialogue-card__message'>
			<p className='ai-dialogue-card__speaker'>
				{message.name || 'Персонаж'}
				<DotSeparator />
				{message.role && <span>{message.role}</span>}
			</p>
			<p
				className={cn(
					'ai-dialogue-card__text',
					message.textType === 'action' && 'ai-dialogue-card__text--action',
				)}
				title={message.text}
			>
				{message.text}
			</p>
		</div>
	)
}
