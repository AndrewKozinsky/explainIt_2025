import { mutationOptions, type QueryClient, queryOptions } from '@tanstack/react-query'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { aiDialogueService } from './AiDialogueService'
import type { AiDialogueService } from './AiDialogueService'
import type { AiDialogueModel, UpdateAiDialogueInput } from './repository/AiDialogueRepository'

/**
 * Ключи кэша серверных данных диалогов с ИИ.
 */
export const aiDialogueQueryKeys = {
	all: ['ai-dialogue'] as const,
	list: () => [...aiDialogueQueryKeys.all, 'list'] as const,
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

	updateDialogue(id: number, queryClient: QueryClient) {
		return mutationOptions({
			mutationKey: aiDialogueQueryKeys.update(id),
			mutationFn: (input: UpdateAiDialogueInput) => unwrapApiResult(this.service.updateDialogue(id, input)),
			onSuccess: async function (dialogue) {
				// Не даём старому запросу перезаписать подтверждённую сервером настройку.
				await Promise.all([
					queryClient.cancelQueries({ queryKey: aiDialogueQueryKeys.detail(dialogue.id), exact: true }),
					queryClient.cancelQueries({ queryKey: aiDialogueQueryKeys.list(), exact: true }),
				])

				queryClient.setQueryData(aiDialogueQueryKeys.detail(dialogue.id), dialogue)
				queryClient.setQueryData<AiDialogueModel[]>(aiDialogueQueryKeys.list(), (current) =>
					current?.map((item) => (item.id === dialogue.id ? dialogue : item)),
				)
			},
		})
	}

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
