import { useTranslations } from 'next-intl'
import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import AiDialogueCharacters from '../AiDialogueCharacters/AiDialogueCharacters'
import AiDialogueDeleteButton from '../AiDialogueDeleteButton/AiDialogueDeleteButton'
import AiDialogueLastMessage from '../AiDialogueLastMessage/AiDialogueLastMessage'
import AiDialogueMeta from '../AiDialogueMeta/AiDialogueMeta'
import AiDialogueSceneImage from '../AiDialogueSceneImage/AiDialogueSceneImage'
import { getDialogueCardDetails } from '../UserAiDialoguesList/fn/getDialogueCardDetails'
import './AiDialogueCard.scss'

type AiDialogueCardProps = {
	dialogue: AiDialogueListItemModel
	locale: string
	onDelete: (id: number) => void
}

/** Карточка диалога пользователя: ссылка на диалог и отдельная кнопка удаления. */
export default function AiDialogueCard({ dialogue, locale, onDelete }: AiDialogueCardProps) {
	const t = useTranslations('userAiDialogues.card')
	const { title, url } = getDialogueCardDetails(dialogue, t('untitledDialogue'))

	return (
		<article className='ai-dialogue-card'>
			<BaseButton
				theme='outline'
				href={url}
				aria-label={t('openDialogue', { title })}
				extraClass='ai-dialogue-card__link'
			>
				<div className='ai-dialogue-card__scene'>
					<AiDialogueSceneImage url={dialogue.sceneImage?.url} title={title} />
				</div>
				<div className='ai-dialogue-card__summary'>
					<h4 className='ai-dialogue-card__title'>{title}</h4>
					<AiDialogueMeta dialogue={dialogue} locale={locale} />
				</div>
				<div className='ai-dialogue-card__characters'>
					<AiDialogueCharacters characters={dialogue.characters} size='medium' maxVisible={3} />
				</div>
				<div className='ai-dialogue-card__message'>
					<AiDialogueLastMessage message={dialogue.lastMessage} />
				</div>
			</BaseButton>
			<AiDialogueDeleteButton id={dialogue.id} title={title} onDelete={onDelete} />
		</article>
	)
}
