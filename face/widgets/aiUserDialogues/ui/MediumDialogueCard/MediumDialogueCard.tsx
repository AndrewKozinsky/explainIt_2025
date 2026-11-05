import BaseButton from '@/shared/ui/formRelated/buttons/BaseButton/BaseButton'
import DialogueCharacters from '../DialogueCharacters/DialogueCharacters'
import DialogueDeleteButton from '../DialogueDeleteButton/DialogueDeleteButton'
import DialogueLastMessage from '../DialogueLastMessage/DialogueLastMessage'
import DialogueMeta from '../DialogueMeta/DialogueMeta'
import DialogueSceneImage from '../DialogueSceneImage/DialogueSceneImage'
import { getDialogueCardDetails } from '../UserAiDialoguesList/fn/getDialogueCardDetails'
import type { DialogueCardProps } from '../UserAiDialoguesList/ui/dialogueCardTypes'
import '../DialogueCard/DialogueCard.scss'
import './MediumDialogueCard.scss'

export default function MediumDialogueCard({ dialogue, locale, onDelete }: DialogueCardProps) {
	const { title, url } = getDialogueCardDetails(dialogue)

	return (
		<article className='ai-dialogue-card'>
			<BaseButton
				theme='outline'
				href={url}
				aria-label={`Открыть диалог «${title}»`}
				extraClass='ai-dialogue-card__link medium-dialogue-card'
			>
				<div className='medium-dialogue-card__scene'>
					<DialogueSceneImage url={dialogue.sceneImage?.url} title={title} />
				</div>
				<div className='medium-dialogue-card__summary'>
					<h4 className='ai-dialogue-card__title'>{title}</h4>
					<DialogueMeta dialogue={dialogue} locale={locale} />
				</div>
				<div className='medium-dialogue-card__characters'>
					<DialogueCharacters characters={dialogue.characters} size='medium' maxVisible={3} />
				</div>
				<div className='medium-dialogue-card__message'>
					<DialogueLastMessage message={dialogue.lastMessage} />
				</div>
			</BaseButton>
			<DialogueDeleteButton id={dialogue.id} title={title} onDelete={onDelete} />
		</article>
	)
}
