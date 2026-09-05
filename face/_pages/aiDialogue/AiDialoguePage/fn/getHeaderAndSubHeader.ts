import type { AiDialogueModel } from '@/entities/aiDialogue/AiDialogueService'
import { pickLocalized } from '@/shared/utils/pickLocalized'

export function getHeaderAndSubHeader(dialogue: AiDialogueModel, locale: string) {
	return {
		header: pickLocalized(dialogue.scenario.title, locale),
	}
}
