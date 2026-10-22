import type { UserMessagePart, UserMessagePartCheck } from '@/entities/aiDialogue/messageCheck/userMessageCheckTypes'

export const MAX_DRAFT_LENGTH = 4000
export type DraftSelection = { start: number; end: number }
export type DraftReview = { revision: number; result: UserMessagePartCheck }
export type DraftPart = {
	text: string
	revision: number
	selection: DraftSelection
	review: DraftReview | null
	checking: boolean
	error: string | null
}
export type DictationPhase = 'starting' | 'recording' | 'finishing'
export type DialogueDraftState = {
	activePart: UserMessagePart
	parts: Record<UserMessagePart, DraftPart>
	dictation: { part: UserMessagePart; phase: DictationPhase } | null
	blocked: boolean
	sending: boolean
}

export function createDraftPart(): DraftPart {
	return { text: '', revision: 0, selection: { start: 0, end: 0 }, review: null, checking: false, error: null }
}

export function isPartChecked(part: DraftPart): boolean {
	return part.review !== null && part.review.revision === part.revision
}

export function isPartReady(part: DraftPart): boolean {
	return !!part.text.trim() && isPartChecked(part) && part.review!.result.critical.length === 0
}

export function canSendDraft(state: DialogueDraftState): boolean {
	const parts = Object.values(state.parts)

	return (
		!state.blocked &&
		!state.sending &&
		!state.dictation &&
		parts.some((part) => part.text.trim()) &&
		parts.every((part) => !part.checking && (!part.text.trim() || isPartReady(part)))
	)
}

export function draftStatus(state: DialogueDraftState): { text: string; locked?: boolean; empty?: boolean } {
	const { activePart, parts, dictation } = state
	const current = parts[activePart]

	if (state.sending) return { text: 'Отправляю ответ…' }

	if (dictation?.part === activePart) {
		if (dictation.phase === 'starting') return { text: 'Подключаю микрофон…' }
		return { text: dictation.phase === 'recording' ? 'Слушаю…' : 'Завершаю распознавание…' }
	}

	if (current.checking) return { text: 'Идёт проверка текста…' }

	if (!current.text.trim()) return { text: '', empty: true }

	if (!isPartChecked(current)) return { text: 'Отправьте на проверку' }

	const count = current.review!.result.critical.length
	if (count) return { text: `Исправьте ${count} ${errorCountWord(count)}, чтобы отправить ответ`, locked: true }

	const other = parts[activePart === 'speech' ? 'action' : 'speech']

	if (other.text.trim() && !isPartReady(other)) {
		if (isPartChecked(other) && other.review!.result.critical.length) {
			return { text: `Текст ${activePart === 'speech' ? 'действия' : 'реплики'} содержит ошибки.` }
		}

		return { text: `Проверьте текст ${activePart === 'speech' ? 'действия' : 'реплики'}.` }
	}

	return { text: 'Ответ можно отправить.' }
}

function errorCountWord(count: number): string {
	if (count % 100 >= 11 && count % 100 <= 14) return 'ошибок'
	if (count % 10 === 1) return 'ошибку'
	return count % 10 >= 2 && count % 10 <= 4 ? 'ошибки' : 'ошибок'
}

/** Вставляет диктовку в сохранённый диапазон, не меняя окружающий текст и пробелы. */
export function insertDictation(text: string, selection: DraftSelection, transcript: string): string {
	return text.slice(0, selection.start) + transcript + text.slice(selection.end)
}
