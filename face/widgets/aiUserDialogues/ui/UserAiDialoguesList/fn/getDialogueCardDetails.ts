import type { AiDialogueListItemModel } from '@/entities/aiDialogue/types/aiDialogueList'
import { pageUrls } from '@/shared/utils/pageUrls'

/** Название сценария уже приходит с сервера на языке интерфейса; untitledDialogueName — запасное название на том же языке. */
export function getDialogueCardDetails(dialogue: AiDialogueListItemModel, untitledDialogueName: string) {
	return {
		title: dialogue.scenario.title || untitledDialogueName,
		url: pageUrls.aiDialogues.dialog(dialogue.id).path,
	}
}
