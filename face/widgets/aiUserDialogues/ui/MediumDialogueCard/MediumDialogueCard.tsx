import DialogueActions from '../DialogueActions/DialogueActions'
import DialogueCharacters from '../DialogueCharacters/DialogueCharacters'
import DialogueLastMessage from '../DialogueLastMessage/DialogueLastMessage'
import DialogueMeta from '../DialogueMeta/DialogueMeta'
import DialogueSceneImage from '../DialogueSceneImage/DialogueSceneImage'
import { getDialogueCardDetails } from '../UserAiDialoguesList/fn/getDialogueCardDetails'
import type { DialogueCardProps } from '../UserAiDialoguesList/ui/dialogueCardTypes'
import './MediumDialogueCard.scss'

export default function MediumDialogueCard({ dialogue, locale, onDelete }: DialogueCardProps) {
	const { title, url } = getDialogueCardDetails(dialogue, locale)

	return (
		<article className='medium-dialogue-card'>
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
			<div className='medium-dialogue-card__actions'>
				<DialogueActions id={dialogue.id} title={title} url={url} theme='outline' onDelete={onDelete} />
			</div>
		</article>
	)
}
