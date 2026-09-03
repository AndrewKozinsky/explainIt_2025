import { AiDialogueModel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import { pageUrls } from '@/shared/utils/pageUrls'

export function getDialoguesCardsConfig(dialogues: AiDialogueModel[]) {
	return dialogues.map((dialogue) => {
		return {
			id: dialogue.id,
			title: dialogue.scenario.title,
			url: pageUrls.aiDialogues.dialog(dialogue.id).path,
		}
	})
}
