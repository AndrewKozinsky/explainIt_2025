import cn from 'classnames'
import { useTranslations } from 'next-intl'
import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'
import CharacterFace from '@/shared/ui/CharacterAvatars/CharacterFace'
import DotSeparator from '@/shared/ui/DotSeparator/DotSeparator'
import './AiDialogueLastMessage.scss'

export default function AiDialogueLastMessage({ message }: { message: AiDialogueListItemModel['lastMessage'] }) {
	const t = useTranslations('userAiDialogues.card')

	if (!message) {
		return <p className='ai-dialogue-last-message ai-dialogue-last-message--empty'>{t('noMessages')}</p>
	}
	const name = message.name || t('characterFallback')

	return (
		<div className='ai-dialogue-last-message'>
			<p className='ai-dialogue-last-message__speaker'>
				<CharacterFace name={name} imageUrl={message.avatarUrl} decorative />
				<strong className='ai-dialogue-last-message__name'>{name}</strong>
				{message.role && (
					<>
						<DotSeparator />
						<span className='ai-dialogue-last-message__role'>{message.role}</span>
					</>
				)}
			</p>
			<p
				className={cn(
					'ai-dialogue-last-message__text',
					message.textType === 'action' && 'ai-dialogue-last-message__text--action',
				)}
				title={message.text}
			>
				{message.text}
			</p>
		</div>
	)
}
