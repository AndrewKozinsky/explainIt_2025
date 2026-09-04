import type { AiDialogueModel } from '@/entities/aiDialogue/AiDialogueService'

export function getHeaderAndSubHeader(dialogue: AiDialogueModel) {
	return {
		header: dialogue.scenario.title,
	}
}
