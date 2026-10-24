import { getDialogueCardDetails } from '../fn/getDialogueCardDetails'
import DialogueCharacters from './parts/DialogueCharacters'
import DialogueDeleteButton from './parts/DialogueDeleteButton'
import DialogueLastMessage from './parts/DialogueLastMessage'
import DialogueReplyButton from './parts/DialogueReplyButton'
import DialogueSceneImage from './parts/DialogueSceneImage'
import DialogueSummary from './parts/DialogueSummary'
import type { DialogueCardProps } from './dialogueCardTypes'

export default function LargeDialogueCard({ dialogue, locale, onDelete }: DialogueCardProps) {
	const { title, url } = getDialogueCardDetails(dialogue, locale)

	return (
		<article className='ai-dialogue-card ai-dialogue-card--featured'>
			<DialogueSceneImage url={dialogue.sceneImage?.url} title={title} />
			<DialogueSummary dialogue={dialogue} locale={locale} title={title} url={url}>
				<p className='ai-dialogue-card__label'>Последний диалог</p>
			</DialogueSummary>
			<DialogueCharacters characters={dialogue.characters} size='small' maxVisible={8} />
			<DialogueLastMessage message={dialogue.lastMessage} />
			<DialogueDeleteButton id={dialogue.id} title={title} onDelete={onDelete} />
			<DialogueReplyButton url={url} title={title} theme='accent' />
		</article>
	)
}
