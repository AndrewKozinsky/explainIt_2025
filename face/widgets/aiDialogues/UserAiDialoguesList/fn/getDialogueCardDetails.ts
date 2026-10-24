import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'
import { pageUrls } from '@/shared/utils/pageUrls'
import { pickLocalized } from '@/shared/utils/pickLocalized'

export function getDialogueCardDetails(dialogue: AiDialogueListItemModel, locale: string) {
	return {
		title: pickLocalized(dialogue.scenario.title, locale) || 'Диалог',
		url: pageUrls.aiDialogues.dialog(dialogue.id).path,
	}
}
