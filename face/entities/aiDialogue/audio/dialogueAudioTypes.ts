import type { AiDialogueAudioItemOutModel, AiDialogueAudioOutModel } from '@/shared/api/generated/models'

export type DialogueAudioItem = Omit<AiDialogueAudioItemOutModel, 'messageId'> & { messageId: number | null }
export type DialogueAudioSnapshot = Omit<AiDialogueAudioOutModel, 'items'> & { items: DialogueAudioItem[] }
export type DialogueAudioTarget = { eventIndex: number; actionIndex: number; npcId: string | null }
export type DialogueAudioAddress = { messageId?: number; attemptId?: string; eventIndex?: number; actionIndex: number }
export type DialogueAudioEvent =
	| { type: 'audioChanged'; dialogueId: number }
	| { type: 'audioAttemptStarted' | 'audioAttemptCancelled'; dialogueId: number; turnId: string; attemptId: string }
	| {
			type: 'audioQueued'
			dialogueId: number
			attemptId: string
			audioId: number
			eventIndex: number
			actionIndex: number
			npcId: string | null
	  }
	| { type: 'audioReady'; dialogueId: number; audio: DialogueAudioItem }

export function audioTargetKey(attemptId: string, target: Pick<DialogueAudioTarget, 'eventIndex' | 'actionIndex'>) {
	return `${attemptId}:${target.eventIndex}:${target.actionIndex}`
}
