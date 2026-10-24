import { getDialogueCardDetails } from '../UserAiDialoguesList/fn/getDialogueCardDetails'
import DialogueActions from '../DialogueActions/DialogueActions'
import DialogueCharacters from '../DialogueCharacters/DialogueCharacters'
import DialogueLastMessage from '../DialogueLastMessage/DialogueLastMessage'
import DialogueSceneImage from '../DialogueSceneImage/DialogueSceneImage'
import DialogueSummary from '../DialogueSummary/DialogueSummary'
import type { DialogueCardProps } from '../UserAiDialoguesList/ui/dialogueCardTypes'

import './MediumDialogueCard.scss'

export default function MediumDialogueCard({ dialogue, locale, onDelete }: DialogueCardProps) {
	const { title, url } = getDialogueCardDetails(dialogue, locale)

	return (
		<article className='medium-dialogue-card'>
			<DialogueSceneImage url={dialogue.sceneImage?.url} title={title} />
			<DialogueSummary dialogue={dialogue} locale={locale} title={title} url={url} />
			<DialogueCharacters characters={dialogue.characters} size='medium' maxVisible={3} />
			<DialogueLastMessage message={dialogue.lastMessage} />
			<DialogueActions id={dialogue.id} title={title} url={url} theme='regular' onDelete={onDelete} />
		</article>
	)
}
