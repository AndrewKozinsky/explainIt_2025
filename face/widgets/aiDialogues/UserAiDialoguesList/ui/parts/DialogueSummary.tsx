import type { ReactNode } from 'react'
import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'
import { formatDialogueDate } from '../../fn/formatDialogueDate'

export default function DialogueSummary({
	dialogue,
	locale,
	title,
	url,
	children,
}: {
	dialogue: AiDialogueListItemModel
	locale: string
	title: string
	url: string
	children?: ReactNode
}) {
	const language =
		new Intl.DisplayNames([locale], { type: 'language' }).of(dialogue.sourceLanguageCode) ??
		dialogue.sourceLanguageCode

	const languageName = language.charAt(0).toLocaleUpperCase(locale) + language.slice(1)

	return (
		<div className='ai-dialogue-card__summary'>
			{children}
			<h4 className='ai-dialogue-card__title'>{title}</h4>
			<p className='ai-dialogue-card__meta'>
				<span className='ai-dialogue-card__language'>{languageName}</span>
				<span>{dialogue.maxCefrLevel ?? 'Без ограничения'}</span>
				<DialogueTime message={dialogue.lastMessage} locale={locale} />
			</p>
		</div>
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
