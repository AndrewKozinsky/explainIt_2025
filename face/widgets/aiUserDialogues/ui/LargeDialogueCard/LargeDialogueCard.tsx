import { useTranslations } from 'next-intl'
import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import DialogueCharacters from '../DialogueCharacters/DialogueCharacters'
import DialogueDeleteButton from '../DialogueDeleteButton/DialogueDeleteButton'
import DialogueLastMessage from '../DialogueLastMessage/DialogueLastMessage'
import DialogueMeta from '../DialogueMeta/DialogueMeta'
import DialogueSceneImage from '../DialogueSceneImage/DialogueSceneImage'
import { getDialogueCardDetails } from '../UserAiDialoguesList/fn/getDialogueCardDetails'
import type { DialogueCardProps } from '../UserAiDialoguesList/ui/dialogueCardTypes'
import '../DialogueCard/DialogueCard.scss'
import './LargeDialogueCard.scss'

export default function LargeDialogueCard({ dialogue, locale, onDelete }: DialogueCardProps) {
	const t = useTranslations('userAiDialogues.card')
	const { title, url } = getDialogueCardDetails(dialogue, t('untitledDialogue'))

	return (
		<article className='ai-dialogue-card'>
			<BaseButton
				theme='outline'
				href={url}
				aria-label={t('openDialogue', { title })}
				extraClass='ai-dialogue-card__link large-dialogue-card'
			>
				<div className='large-dialogue-card__scene'>
					<DialogueSceneImage url={dialogue.sceneImage?.url} title={title} />
				</div>
				<div className='large-dialogue-card__info'>
					<div className='large-dialogue-card__summary'>
						<p className='large-dialogue-card__label'>{t('lastDialogue')}</p>
						<h4 className='large-dialogue-card__title'>{title}</h4>
						<DialogueMeta dialogue={dialogue} locale={locale} />
						<div className='large-dialogue-card__characters'>
							<DialogueCharacters characters={dialogue.characters} size='small' maxVisible={8} />
						</div>
					</div>
					<div className='large-dialogue-card__message'>
						<DialogueLastMessage message={dialogue.lastMessage} />
					</div>
				</div>
			</BaseButton>
			<DialogueDeleteButton id={dialogue.id} title={title} onDelete={onDelete} />
		</article>
	)
}
