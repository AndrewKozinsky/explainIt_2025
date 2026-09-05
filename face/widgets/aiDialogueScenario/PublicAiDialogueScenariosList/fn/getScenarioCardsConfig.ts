import { AiDialogueScenarioModel } from '@/entities/aiDialogueScenario/repository/AiDialogueScenarioRepository'
import { pickLocalized } from '@/shared/utils/pickLocalized'

export function getScenarioCardsConfig(scenarios: AiDialogueScenarioModel[], locale: string) {
	return scenarios.map((scenario) => {
		return {
			id: scenario.id,
			title: pickLocalized(scenario.title, locale),
			description: pickLocalized(scenario.description, locale),
		}
	})
}
