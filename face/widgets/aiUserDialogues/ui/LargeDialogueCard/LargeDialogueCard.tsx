import DialogueActions from '../DialogueActions/DialogueActions'
import DialogueCharacters from '../DialogueCharacters/DialogueCharacters'
import DialogueLastMessage from '../DialogueLastMessage/DialogueLastMessage'
import DialogueSceneImage from '../DialogueSceneImage/DialogueSceneImage'
import DialogueSummary from '../DialogueSummary/DialogueSummary'
import { getDialogueCardDetails } from '../UserAiDialoguesList/fn/getDialogueCardDetails'
import type { DialogueCardProps } from '../UserAiDialoguesList/ui/dialogueCardTypes'
import './LargeDialogueCard.scss'

export default function LargeDialogueCard({ dialogue, locale, onDelete }: DialogueCardProps) {
	const { title, url } = getDialogueCardDetails(dialogue, locale)

	return (
		<article className='large-dialogue-card'>
			<DialogueSceneImage url={dialogue.sceneImage?.url} title={title} />
			<DialogueSummary dialogue={dialogue} locale={locale} title={title} url={url}>
				<p className='large-dialogue-card__label'>Последний диалог</p>
			</DialogueSummary>
			<DialogueCharacters characters={dialogue.characters} size='small' maxVisible={8} />
			<DialogueLastMessage message={dialogue.lastMessage} />
			<DialogueActions id={dialogue.id} title={title} url={url} theme='accent' onDelete={onDelete} />
		</article>
	)
}
