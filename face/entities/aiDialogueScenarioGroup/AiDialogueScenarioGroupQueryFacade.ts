import { queryOptions } from '@tanstack/react-query'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { aiDialogueScenarioGroupService, type AiDialogueScenarioGroupService } from './AiDialogueScenarioGroupService'

export const aiDialogueScenarioGroupQueryKeys = {
	all: ['ai-dialogue-scenario-group'] as const,
	list: () => [...aiDialogueScenarioGroupQueryKeys.all, 'list'] as const,
}

export class AiDialogueScenarioGroupQueryFacade {
	constructor(private readonly service: AiDialogueScenarioGroupService) {}

	getAiDialogueScenarioGroups() {
		return queryOptions({
			queryKey: aiDialogueScenarioGroupQueryKeys.list(),
			queryFn: ({ signal }) => unwrapApiResult(this.service.getAiDialogueScenarioGroups(signal)),
			refetchInterval: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		})
	}
}

export const aiDialogueScenarioGroupQueries = new AiDialogueScenarioGroupQueryFacade(aiDialogueScenarioGroupService)
