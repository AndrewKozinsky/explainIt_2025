import type { DictationErrorKey } from '@/entities/aiDialogue/dictation/openAiDialogueDictation'
import type { UserMessagePart } from '@/entities/aiDialogue/messageCheck/userMessageCheckTypes'

export const MAX_DRAFT_LENGTH = 4000
export type DraftSelection = { start: number; end: number }

/** Ключ текста ошибки: aiDialogueForm.errors.<ключ> в messages/{locale}/aiDialogueForm.json. */
export type DraftErrorKey = DictationErrorKey | 'dictationStartFailed' | 'dictationTextLimit' | 'textTooLong'
export type DraftSubmitError = { message?: string }
export type DraftPart = {
	text: string
	selection: DraftSelection
	error: DraftErrorKey | null
}

export type DictationPhase = 'starting' | 'recording' | 'finishing'

export type DialogueDraftState = {
	activePart: UserMessagePart
	parts: Record<UserMessagePart, DraftPart>
	dictation: { part: UserMessagePart; phase: DictationPhase; stream?: MediaStream } | null
	blocked: boolean
	sending: boolean
	submitError: DraftSubmitError | null
}

export function createDraftPart(): DraftPart {
	return { text: '', selection: { start: 0, end: 0 }, error: null }
}

export function canSendDraft(state: DialogueDraftState): boolean {
	return (
		!state.blocked &&
		!state.sending &&
		!state.dictation &&
		Object.values(state.parts).some((part) => part.text.trim())
	)
}

export function draftStatus(state: DialogueDraftState) {
	if (state.sending) return 'sending'

	switch (state.dictation?.phase) {
		case 'starting':
			return 'connectingMicrophone'
		case 'recording':
			return 'listening'
		case 'finishing':
			return 'finishingRecognition'
		default:
			return state.parts[state.activePart].text.trim() ? null : 'empty'
	}
}

/** Вставляет диктовку в сохранённый диапазон, не меняя окружающий текст и пробелы. */
export function insertDictation(text: string, selection: DraftSelection, transcript: string): string {
	return text.slice(0, selection.start) + transcript + text.slice(selection.end)
}
