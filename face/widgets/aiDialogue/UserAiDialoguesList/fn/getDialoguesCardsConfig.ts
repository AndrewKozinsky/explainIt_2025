import { AiDialogueModel } from '@/entities/aiDialogue/repository/AiDialogueRepository'
import { pageUrls } from '@/shared/utils/pageUrls'
import { pickLocalized } from '@/shared/utils/pickLocalized'

export function getDialoguesCardsConfig(dialogues: AiDialogueModel[], locale: string) {
	return dialogues.map((dialogue) => {
		return {
			id: dialogue.id,
			title: pickLocalized(dialogue.scenario.title, locale),
			url: pageUrls.aiDialogues.dialog(dialogue.id).path,
		}
	})
}
