import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'
import { pageUrls } from '@/shared/utils/pageUrls'

/** Название сценария уже приходит с сервера на языке интерфейса. */
export function getDialogueCardDetails(dialogue: AiDialogueListItemModel) {
	return {
		title: dialogue.scenario.title || 'Диалог',
		url: pageUrls.aiDialogues.dialog(dialogue.id).path,
	}
}
