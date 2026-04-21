import { Injectable } from '@nestjs/common'

// In-memory registry, обеспечивающий лимит «1 активная генерация на пользователя».
// Хранит AbortController'ы, связанные с userId и assistantMessageId.
@Injectable()
export class ActiveSentenceChatGenerationRegistry {
	private byUserId = new Map<number, { assistantMessageId: number; abortController: AbortController }>()
	private byAssistantMessageId = new Map<number, { userId: number; abortController: AbortController }>()

	hasActiveForUser(userId: number): boolean {
		return this.byUserId.has(userId)
	}

	register(userId: number, assistantMessageId: number): AbortController {
		const abortController = new AbortController()

		this.byUserId.set(userId, { assistantMessageId, abortController })
		this.byAssistantMessageId.set(assistantMessageId, { userId, abortController })

		return abortController
	}

	unregister(assistantMessageId: number) {
		const entry = this.byAssistantMessageId.get(assistantMessageId)
		if (!entry) return

		this.byAssistantMessageId.delete(assistantMessageId)

		const byUser = this.byUserId.get(entry.userId)
		if (byUser && byUser.assistantMessageId === assistantMessageId) {
			this.byUserId.delete(entry.userId)
		}
	}
}
