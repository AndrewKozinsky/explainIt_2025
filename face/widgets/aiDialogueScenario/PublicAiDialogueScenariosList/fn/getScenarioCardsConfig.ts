import { AiDialogueScenarioModel } from '@/entities/aiDialogueScenario/repository/AiDialogueScenarioRepository'
import { LanguageCode } from '@/shared/utils/languages'

export function getScenarioCardsConfig(scenarios: AiDialogueScenarioModel[], currentLang: LanguageCode) {
	return scenarios
		.filter((scenario) => scenario.languageCode === currentLang)
		.map((scenario) => {
			return {
				id: scenario.id,
				title: scenario.title,
				description: scenario.description,
			}
		})
}
