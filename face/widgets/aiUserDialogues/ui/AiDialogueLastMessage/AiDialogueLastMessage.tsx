import cn from 'classnames'
import { useTranslations } from 'next-intl'
import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'
import DotSeparator from '@/shared/ui/DotSeparator/DotSeparator'
import './AiDialogueLastMessage.scss'

export default function AiDialogueLastMessage({ message }: { message: AiDialogueListItemModel['lastMessage'] }) {
	const t = useTranslations('userAiDialogues.card')

	if (!message) {
		return <p className='ai-dialogue-last-message ai-dialogue-last-message--empty'>{t('noMessages')}</p>
	}

	return (
		<div className='ai-dialogue-last-message'>
			<p className='ai-dialogue-last-message__speaker'>
				{message.name || t('characterFallback')}
				<DotSeparator />
				{message.role && <span className='ai-dialogue-last-message__role'>{message.role}</span>}
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
