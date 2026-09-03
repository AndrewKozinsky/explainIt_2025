/**
 * Типы компактной сводки ролевого диалога (AiDialogue.summary).
 *
 * Сводка хранится как JSON-строка (в БД это TEXT) и представляет собой
 * append-only массив блоков. Новый блок добавляется, когда меняется состояние
 * (сцена / активный NPC / реестр NPC); иначе текст дописывается в history
 * последнего блока.
 */

export type AiDialogueNpcRosterEntry = {
	npcId: string
	npcName: string
	npcRole: string
}

export type AiDialogueSummaryState = {
	scene: string
	activeNpcId: null | string
	roster: AiDialogueNpcRosterEntry[]
}

export type AiDialogueSummaryBlock = {
	state: AiDialogueSummaryState
	history: string
}

export type AiDialogueSummary = AiDialogueSummaryBlock[]

// Разбирает JSON-строку сводки. Возвращает null, если сводки нет или она битая
// (сводку пишет только наш сервер, поэтому содержимое считаем доверенным).
export function parseAiDialogueSummary(summary: null | string): null | AiDialogueSummary {
	if (!summary) return null

	try {
		const parsed = JSON.parse(summary)
		if (!Array.isArray(parsed)) return null

		return parsed as AiDialogueSummary
	} catch {
		return null
	}
}
