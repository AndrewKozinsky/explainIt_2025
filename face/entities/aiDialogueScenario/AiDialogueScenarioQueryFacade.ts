import { queryOptions } from '@tanstack/react-query'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { aiDialogueScenarioService, type AiDialogueScenarioService } from './AiDialogueScenarioService'

export const aiDialogueScenarioQueryKeys = {
	all: ['ai-dialogue-scenario'] as const,
	publicCount: () => [...aiDialogueScenarioQueryKeys.all, 'public-count'] as const,
}

export class AiDialogueScenarioQueryFacade {
	constructor(private readonly service: AiDialogueScenarioService) {}

	getPublicScenarioCount() {
		return queryOptions({
			queryKey: aiDialogueScenarioQueryKeys.publicCount(),
			queryFn: ({ signal }) => unwrapApiResult(this.service.getPublicScenarioCount(signal)),
			refetchInterval: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		})
	}
}

export const aiDialogueScenarioQueries = new AiDialogueScenarioQueryFacade(aiDialogueScenarioService)
