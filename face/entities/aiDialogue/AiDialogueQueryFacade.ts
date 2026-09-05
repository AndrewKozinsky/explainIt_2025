import { queryOptions } from '@tanstack/react-query'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { aiDialogueService } from './AiDialogueService'
import type { AiDialogueService } from './AiDialogueService'

/**
 * Ключи кэша серверных данных диалогов с ИИ.
 */
export const aiDialogueQueryKeys = {
	all: ['ai-dialogue'] as const,
	list: () => [...aiDialogueQueryKeys.all, 'list'] as const,
	detail: (id: number) => [...aiDialogueQueryKeys.all, 'detail', id] as const,
}

/**
 * Адаптер между доменным сервисом и TanStack Query.
 *
 * В кэш попадают {@link AiDialogueModel}, а не DTO OpenAPI: все источники
 * данных продолжают соответствовать контракту {@link AiDialogueRepository}.
 */
export class AiDialogueQueryFacade {
	constructor(private readonly service: AiDialogueService) {}

	getUserDialogues() {
		return queryOptions({
			queryKey: aiDialogueQueryKeys.list(),
			queryFn: () => unwrapApiResult(this.service.getUserDialogues()),
		})
	}

	getDialogue(id: number) {
		return queryOptions({
			queryKey: aiDialogueQueryKeys.detail(id),
			queryFn: () => unwrapApiResult(this.service.getDialogue(id)),
		})
	}
}

export const aiDialogueQueries = new AiDialogueQueryFacade(aiDialogueService)
