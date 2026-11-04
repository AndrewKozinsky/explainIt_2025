import type { AiDialogueModel } from '@/entities/aiDialogue/AiDialogueService'

/** Название сценария уже приходит с сервера на языке интерфейса. */
export function getHeaderAndSubHeader(dialogue: AiDialogueModel) {
	return {
		header: dialogue.scenario.title,
	}
}
