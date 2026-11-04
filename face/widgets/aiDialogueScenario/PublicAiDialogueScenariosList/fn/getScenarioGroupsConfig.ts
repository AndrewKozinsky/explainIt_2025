import { aiDialogueScenarioConfig } from '@/entities/aiDialogueScenario/lib/aiDialogueScenarioConfig'
import type { AiDialogueScenarioGroupModel } from '@/entities/aiDialogueScenarioGroup/repository/AiDialogueScenarioGroupRepository'

/** Готовит группы и карточки для вывода; тексты уже приходят с сервера на языке интерфейса. */
export function getScenarioGroupsConfig(groups: AiDialogueScenarioGroupModel[]) {
	return groups.map((group) => ({
		id: group.id,
		title: group.title,
		description: group.description,
		scenarios: group.scenarios.map((scenario) => ({
			id: scenario.id,
			title: scenario.title || aiDialogueScenarioConfig.emptyScenarioName,
			description: scenario.description,
			coverUrl: scenario.coverUrl,
		})),
	}))
}

export type ScenarioGroupConfig = ReturnType<typeof getScenarioGroupsConfig>[number]
export type ScenarioCardConfig = ScenarioGroupConfig['scenarios'][number]
