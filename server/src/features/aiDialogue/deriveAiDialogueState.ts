import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { AiDialogueNpcRosterEntry, AiDialogueSummaryState } from 'types/aiDialogueSummary'

/**
 * Детерминированно выводит состояние диалога (сцена / активный NPC / реестр NPC)
 * из предыдущего состояния и новых событий. Не полагается на LLM — состояние
 * всегда извлекается из самих событий.
 */
export function deriveAiDialogueState(
	prevState: null | AiDialogueSummaryState,
	events: AiDialogueEvent[],
): AiDialogueSummaryState {
	let scene = prevState?.scene ?? ''
	let activeNpcId = prevState?.activeNpcId ?? null

	const rosterMap = new Map<string, AiDialogueNpcRosterEntry>()
	for (const entry of prevState?.roster ?? []) {
		rosterMap.set(entry.npcId, entry)
	}

	for (const event of events) {
		if (event.type === 'sceneUpdate') {
			scene = event.content
		}

		if (event.type === 'npcActions') {
			rosterMap.set(event.npcId, { npcId: event.npcId, npcName: event.npcName, npcRole: event.npcRole })
			activeNpcId = event.npcId
		}
	}

	return { scene, activeNpcId, roster: [...rosterMap.values()] }
}

// Сравнивает два состояния по содержимому. Нужно, чтобы решить: добавлять ли новый
// блок сводки или дописывать history в последний блок (append-only структура).
export function sameAiDialogueState(a: AiDialogueSummaryState, b: AiDialogueSummaryState): boolean {
	if (a.scene !== b.scene) return false
	if (a.activeNpcId !== b.activeNpcId) return false
	if (a.roster.length !== b.roster.length) return false

	return a.roster.every((entry, index) => {
		const other = b.roster[index]
		return entry.npcId === other.npcId && entry.npcName === other.npcName && entry.npcRole === other.npcRole
	})
}
