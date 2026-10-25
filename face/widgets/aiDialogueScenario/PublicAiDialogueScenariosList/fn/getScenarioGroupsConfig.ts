import { aiDialogueScenarioConfig } from '@/entities/aiDialogueScenario/lib/aiDialogueScenarioConfig'
import type { AiDialogueScenarioGroupModel } from '@/entities/aiDialogueScenarioGroup/repository/AiDialogueScenarioGroupRepository'
import { pickLocalized } from '@/shared/utils/pickLocalized'

export function getScenarioGroupsConfig(groups: AiDialogueScenarioGroupModel[], locale: string) {
	return groups.map((group) => ({
		id: group.id,
		title: pickLocalized(group.title, locale),
		scenarios: group.scenarios.map((scenario) => ({
			id: scenario.id,
			title: pickLocalized(scenario.title, locale) || aiDialogueScenarioConfig.emptyScenarioName,
			description: pickLocalized(scenario.description, locale),
			coverUrl: scenario.coverUrl,
		})),
	}))
}

export type ScenarioGroupConfig = ReturnType<typeof getScenarioGroupsConfig>[number]
export type ScenarioCardConfig = ScenarioGroupConfig['scenarios'][number]
