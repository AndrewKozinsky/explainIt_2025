import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'
import { formatDialogueDate } from '../UserAiDialoguesList/fn/formatDialogueDate'
import './DialogueMeta.scss'

export default function DialogueMeta({ dialogue, locale }: { dialogue: AiDialogueListItemModel; locale: string }) {
	const language =
		new Intl.DisplayNames([locale], { type: 'language' }).of(dialogue.sourceLanguageCode) ??
		dialogue.sourceLanguageCode

	const languageName = language.charAt(0).toLocaleUpperCase(locale) + language.slice(1)

	return (
		<p className='ai-dialogue-card__meta'>
			<span className='ai-dialogue-card__language'>{languageName}</span>
			<span>{dialogue.maxCefrLevel ?? 'Без ограничения'}</span>
			<DialogueTime message={dialogue.lastMessage} locale={locale} />
		</p>
	)
}

function DialogueTime({ message, locale }: { message: AiDialogueListItemModel['lastMessage']; locale: string }) {
	if (!message) return null

	const date = formatDialogueDate(message.createdAt, locale)
	if (!date) return null

	return (
		<time dateTime={message.createdAt} title={new Date(message.createdAt).toLocaleString(locale)}>
			{date}
		</time>
	)
}
