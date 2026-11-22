import type {
	DialogueServerMessage,
	ExamResultEvent,
} from '@/widgets/aiDialogue/aiDialogueMessages/types/aiDialogueMessage'

export const EXAM_MIN_REPLIES = 2

export function getExamProgress(messages: DialogueServerMessage[]) {
	const replies = messages.filter(
		({ payload }) =>
			payload.type === 'userActions' &&
			payload.actions.some((action) => action.type === 'speech' && action.content.trim()),
	).length

	const result = messages.find(({ payload }) => payload.type === 'examResult')?.payload as ExamResultEvent | undefined

	return { remaining: Math.max(0, EXAM_MIN_REPLIES - replies), result }
}
