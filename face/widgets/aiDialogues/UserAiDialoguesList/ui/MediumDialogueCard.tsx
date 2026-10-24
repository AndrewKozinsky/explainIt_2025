import { getDialogueCardDetails } from '../fn/getDialogueCardDetails'
import DialogueCharacters from './parts/DialogueCharacters'
import DialogueDeleteButton from './parts/DialogueDeleteButton'
import DialogueLastMessage from './parts/DialogueLastMessage'
import DialogueReplyButton from './parts/DialogueReplyButton'
import DialogueSceneImage from './parts/DialogueSceneImage'
import DialogueSummary from './parts/DialogueSummary'
import type { DialogueCardProps } from './dialogueCardTypes'

export default function MediumDialogueCard({ dialogue, locale, onDelete }: DialogueCardProps) {
	const { title, url } = getDialogueCardDetails(dialogue, locale)

	return (
		<article className='ai-dialogue-card'>
			<DialogueSceneImage url={dialogue.sceneImage?.url} title={title} />
			<DialogueSummary dialogue={dialogue} locale={locale} title={title} url={url} />
			<DialogueCharacters characters={dialogue.characters} size='medium' maxVisible={3} />
			<DialogueLastMessage message={dialogue.lastMessage} />
			<DialogueDeleteButton id={dialogue.id} title={title} onDelete={onDelete} />
			<DialogueReplyButton url={url} title={title} theme='regular' />
		</article>
	)
}
