import type { DictationErrorKey } from '@/entities/aiDialogue/dictation/openAiDialogueDictation'
import type { UserMessagePart, UserMessagePartCheck } from '@/entities/aiDialogue/messageCheck/userMessageCheckTypes'

export const MAX_DRAFT_LENGTH = 4000
export type DraftSelection = { start: number; end: number }
export type DraftReview = { revision: number; result: UserMessagePartCheck }
/** Ключ текста ошибки: aiDialogueForm.errors.<ключ> в messages/{locale}/aiDialogueForm.json. */
export type DraftErrorKey =
	| DictationErrorKey
	| 'checkFailed'
	| 'dictationStartFailed'
	| 'sendFailed'
	| 'dictationTextLimit'
	| 'textTooLong'
/** Ключ текста статуса: aiDialogueForm.status.<ключ>. */
export type DraftStatusKey =
	| 'sending'
	| 'connectingMicrophone'
	| 'listening'
	| 'finishingRecognition'
	| 'checking'
	| 'needsCheck'
	| 'fixErrors'
	| 'speechHasErrors'
	| 'actionHasErrors'
	| 'checkSpeech'
	| 'checkAction'
	| 'ready'

/** empty — поле пустое, показывается подсказка; errorCount — число ошибок для fixErrors. */
export type DraftStatus = { key: DraftStatusKey; errorCount?: number; locked?: boolean } | { empty: true }
export type DraftPart = {
	text: string
	revision: number
	selection: DraftSelection
	review: DraftReview | null
	checking: boolean
	error: DraftErrorKey | null
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

export function draftStatus(state: DialogueDraftState): DraftStatus {
	const { activePart, parts, dictation } = state
	const current = parts[activePart]

	if (state.sending) return { key: 'sending' }

	if (dictation?.part === activePart) {
		if (dictation.phase === 'starting') return { key: 'connectingMicrophone' }
		return { key: dictation.phase === 'recording' ? 'listening' : 'finishingRecognition' }
	}

	if (current.checking) return { key: 'checking' }

	if (!current.text.trim()) return { empty: true }

	if (!isPartChecked(current)) return { key: 'needsCheck' }

	const count = current.review!.result.critical.length
	if (count) return { key: 'fixErrors', errorCount: count, locked: true }

	const other = parts[activePart === 'speech' ? 'action' : 'speech']

	if (other.text.trim() && !isPartReady(other)) {
		if (isPartChecked(other) && other.review!.result.critical.length) {
			return { key: activePart === 'speech' ? 'actionHasErrors' : 'speechHasErrors' }
		}

		return { key: activePart === 'speech' ? 'checkAction' : 'checkSpeech' }
	}

	return { key: 'ready' }
}

/** Вставляет диктовку в сохранённый диапазон, не меняя окружающий текст и пробелы. */
export function insertDictation(text: string, selection: DraftSelection, transcript: string): string {
	return text.slice(0, selection.start) + transcript + text.slice(selection.end)
}
