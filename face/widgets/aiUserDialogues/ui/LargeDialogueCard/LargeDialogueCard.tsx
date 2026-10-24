import DialogueActions from '../DialogueActions/DialogueActions'
import DialogueCharacters from '../DialogueCharacters/DialogueCharacters'
import DialogueLastMessage from '../DialogueLastMessage/DialogueLastMessage'
import DialogueMeta from '../DialogueMeta/DialogueMeta'
import DialogueSceneImage from '../DialogueSceneImage/DialogueSceneImage'
import DialogueTitle from '../DialogueTitle/DialogueTitle'
import { getDialogueCardDetails } from '../UserAiDialoguesList/fn/getDialogueCardDetails'
import type { DialogueCardProps } from '../UserAiDialoguesList/ui/dialogueCardTypes'
import './LargeDialogueCard.scss'

export default function LargeDialogueCard({ dialogue, locale, onDelete }: DialogueCardProps) {
	const { title, url } = getDialogueCardDetails(dialogue, locale)

	return (
		<article className='large-dialogue-card'>
			<DialogueSceneImage url={dialogue.sceneImage?.url} title={title} />
			<div className='ai-dialogue-card__summary'>
				<p className='large-dialogue-card__label'>Последний диалог</p>
				<DialogueTitle title={title} />
				<DialogueMeta dialogue={dialogue} locale={locale} />
			</div>
			<DialogueCharacters characters={dialogue.characters} size='small' maxVisible={8} />
			<DialogueLastMessage message={dialogue.lastMessage} />
			<DialogueActions id={dialogue.id} title={title} url={url} theme='accent' onDelete={onDelete} />
		</article>
	)
}
