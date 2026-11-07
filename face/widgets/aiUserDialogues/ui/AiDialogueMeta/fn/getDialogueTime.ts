import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'
import { formatDialogueDate } from '../../UserAiDialoguesList/fn/formatDialogueDate'

export function getDialogueTime(message: AiDialogueListItemModel['lastMessage'], locale: string) {
	if (!message) return null

	const date = formatDialogueDate(message.createdAt, locale)
	if (!date) return null

	return {
		date,
		dateTime: message.createdAt,
		title: new Date(message.createdAt).toLocaleString(locale),
	}
}
