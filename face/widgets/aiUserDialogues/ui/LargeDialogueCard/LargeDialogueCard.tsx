import DialogueActions from '../DialogueActions/DialogueActions'
import DialogueCharacters from '../DialogueCharacters/DialogueCharacters'
import DialogueLastMessage from '../DialogueLastMessage/DialogueLastMessage'
import DialogueMeta from '../DialogueMeta/DialogueMeta'
import DialogueSceneImage from '../DialogueSceneImage/DialogueSceneImage'
import { getDialogueCardDetails } from '../UserAiDialoguesList/fn/getDialogueCardDetails'
import type { DialogueCardProps } from '../UserAiDialoguesList/ui/dialogueCardTypes'
import './LargeDialogueCard.scss'

export default function LargeDialogueCard({ dialogue, locale, onDelete }: DialogueCardProps) {
	const { title, url } = getDialogueCardDetails(dialogue, locale)

	return (
		<article className='large-dialogue-card'>
			<div className='large-dialogue-card__scene'>
				<DialogueSceneImage url={dialogue.sceneImage?.url} title={title} />
			</div>
			<div className='large-dialogue-card__summary'>
				<p className='large-dialogue-card__label'>Последний диалог</p>
				<h4 className='large-dialogue-card__title'>{title}</h4>
				<DialogueMeta dialogue={dialogue} locale={locale} />
			</div>
			<div className='large-dialogue-card__characters'>
				<DialogueCharacters characters={dialogue.characters} size='small' maxVisible={8} />
			</div>
			<div className='large-dialogue-card__message'>
				<DialogueLastMessage message={dialogue.lastMessage} />
			</div>
			<div className='large-dialogue-card__actions'>
				<DialogueActions id={dialogue.id} title={title} url={url} theme='accent' onDelete={onDelete} />
			</div>
		</article>
	)
}
