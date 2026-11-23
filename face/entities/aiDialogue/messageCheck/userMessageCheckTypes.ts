export type UserMessagePart = 'speech' | 'action'

export type UserMessageCriticalIssue = {
	title: string
	sentenceMarkdown: string
	explanationMarkdown: string
}

export type UserMessageSuggestion = {
	explanationMarkdown: string
	example: string
}

export type UserMessagePartCheck = {
	critical: UserMessageCriticalIssue[]
	suggestions: UserMessageSuggestion[]
}

export type UserMessageReviewIssue = UserMessageCriticalIssue & {
	correction?: { replacement: string; kind: 'error' | 'language'; occurrence: number }
}

export type UserMessagePartReview = Omit<UserMessagePartCheck, 'critical'> & { critical: UserMessageReviewIssue[] }

export type UserMessageCheck = Record<UserMessagePart, UserMessagePartCheck>

export type CheckUserMessageInput = Partial<Record<UserMessagePart, string>>
