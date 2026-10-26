import {
	infiniteQueryOptions,
	mutationOptions,
	type InfiniteData,
	type QueryClient,
	queryOptions,
} from '@tanstack/react-query'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { aiDialogueService } from './AiDialogueService'
import { updateDialogueListLevel } from './fn/updateDialogueListLevel'
import type { AiDialogueService } from './AiDialogueService'
import type { UpdateAiDialogueInput } from './repository/AiDialogueRepository'
import type { AiDialoguesPageModel } from './types/aiDialogueList'

/**
 * Ключи кэша серверных данных диалогов с ИИ.
 */
export const aiDialogueQueryKeys = {
	all: ['ai-dialogue'] as const,
	illustrationStyles: () => [...aiDialogueQueryKeys.all, 'illustration-styles'] as const,
	list: () => [...aiDialogueQueryKeys.all, 'list'] as const,
	userList: (userId: number) => [...aiDialogueQueryKeys.list(), userId, { pageSize: 10 }] as const,
	detail: (id: number) => [...aiDialogueQueryKeys.all, 'detail', id] as const,
	update: (id: number) => [...aiDialogueQueryKeys.all, 'update', id] as const,
	audio: (id: number) => [...aiDialogueQueryKeys.detail(id), 'audio'] as const,
	visuals: (id: number) => [...aiDialogueQueryKeys.detail(id), 'visuals'] as const,
}

/**
 * Адаптер между доменным сервисом и TanStack Query.
 *
 * В кэш попадают {@link AiDialogueModel}, а не DTO OpenAPI: все источники
 * данных продолжают соответствовать контракту {@link AiDialogueRepository}.
 */
export class AiDialogueQueryFacade {
	constructor(private readonly service: AiDialogueService) {}

	getIllustrationStyles() {
		return queryOptions({
			queryKey: aiDialogueQueryKeys.illustrationStyles(),
			queryFn: ({ signal }) => unwrapApiResult(this.service.getIllustrationStyles(signal)),
			refetchInterval: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
			retry: false,
		})
	}

	updateDialogue(id: number, queryClient: QueryClient) {
		return mutationOptions({
			mutationKey: aiDialogueQueryKeys.update(id),
			mutationFn: (input: UpdateAiDialogueInput) => unwrapApiResult(this.service.updateDialogue(id, input)),
			onSuccess: async function (dialogue) {
				// Не даём старому запросу перезаписать подтверждённую сервером настройку.
				await Promise.all([
					queryClient.cancelQueries({ queryKey: aiDialogueQueryKeys.detail(dialogue.id), exact: true }),
					queryClient.cancelQueries({ queryKey: aiDialogueQueryKeys.list() }),
				])

				queryClient.setQueryData(aiDialogueQueryKeys.detail(dialogue.id), dialogue)
				queryClient.setQueriesData<InfiniteData<AiDialoguesPageModel>>(
					{ queryKey: aiDialogueQueryKeys.list() },
					(current) => updateDialogueListLevel(current, dialogue),
				)
			},
		})
	}

	getUserDialogues(userId: number) {
		return infiniteQueryOptions({
			queryKey: aiDialogueQueryKeys.userList(userId),
			initialPageParam: 1,
			queryFn: ({ pageParam, signal }) =>
				unwrapApiResult(this.service.getUserDialogues({ page: pageParam, pageSize: 10 }, signal)),
			getNextPageParam: (page) => (page.page < page.totalPages ? page.page + 1 : undefined),
			refetchInterval: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		})
	}

	getDialogue(id: number) {
		return queryOptions({
			queryKey: aiDialogueQueryKeys.detail(id),
			queryFn: () => unwrapApiResult(this.service.getDialogue(id)),
		})
	}

	getAudio(id: number) {
		return queryOptions({
			queryKey: aiDialogueQueryKeys.audio(id),
			queryFn: ({ signal }) => unwrapApiResult(this.service.getAudio(id, signal)),
		})
	}

	getVisuals(id: number) {
		return queryOptions({
			queryKey: aiDialogueQueryKeys.visuals(id),
			queryFn: ({ signal }) => unwrapApiResult(this.service.getVisuals(id, signal)),
		})
	}
}

export const aiDialogueQueries = new AiDialogueQueryFacade(aiDialogueService)
