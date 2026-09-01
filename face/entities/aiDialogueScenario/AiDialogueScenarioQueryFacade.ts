import { queryOptions } from '@tanstack/react-query'
import { unwrapApiResult } from '@/shared/utils/fetchData/unwrapApiResult'
import { aiDialogueScenarioService } from './AiDialogueScenarioService'
import type { AiDialogueScenarioService } from './AiDialogueScenarioService'

/**
 * Ключи кэша серверных данных сценариев ролевого диалога.
 */
export const aiDialogueScenarioQueryKeys = {
	all: ['ai-dialogue-scenario'] as const,
	list: () => [...aiDialogueScenarioQueryKeys.all, 'list'] as const,
}

/**
 * Адаптер между доменным сервисом и TanStack Query.
 *
 * В кэш попадают {@link AiDialogueScenarioModel}, а не DTO OpenAPI: все источники
 * данных продолжают соответствовать контракту {@link AiDialogueScenarioRepository}.
 */
export class AiDialogueScenarioQueryFacade {
	constructor(private readonly service: AiDialogueScenarioService) {}

	getAiDialogueScenarios() {
		return queryOptions({
			queryKey: aiDialogueScenarioQueryKeys.list(),
			queryFn: () => unwrapApiResult(this.service.getAiDialogueScenarios()),
		})
	}
}

export const aiDialogueScenarioQueries = new AiDialogueScenarioQueryFacade(aiDialogueScenarioService)
