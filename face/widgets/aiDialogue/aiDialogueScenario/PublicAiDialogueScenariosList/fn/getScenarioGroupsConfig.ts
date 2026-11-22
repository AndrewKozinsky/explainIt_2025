import type { AiDialogueScenarioGroupModel } from '@/entities/aiDialogueScenarioGroup/repository/AiDialogueScenarioGroupRepository'

/** Запасные тексты на языке интерфейса для сценария без названия или без подсказки к пожеланиям */
export type ScenarioFallbackTexts = {
	emptyScenarioName: string
	defaultUserScenarioAmendmentHint: string
}

/** Готовит группы и карточки для вывода; тексты уже приходят с сервера на языке интерфейса. */
export function getScenarioGroupsConfig(groups: AiDialogueScenarioGroupModel[], fallbackTexts: ScenarioFallbackTexts) {
	return groups.map((group) => ({
		id: group.id,
		title: group.title,
		description: group.description,
		scenarios: group.scenarios.map((scenario) => ({
			id: scenario.id,
			title: scenario.title || fallbackTexts.emptyScenarioName,
			description: scenario.description,
			userScenarioAmendmentHint:
				scenario.userScenarioAmendmentHint || fallbackTexts.defaultUserScenarioAmendmentHint,
			conversationIdeas: scenario.conversationIdeas.filter((idea) => idea.trim() !== ''),
			trainedSkills: scenario.trainedSkills,
			coverUrl: scenario.coverUrl,
		})),
	}))
}

export type ScenarioGroupConfig = ReturnType<typeof getScenarioGroupsConfig>[number]
export type ScenarioCardConfig = ScenarioGroupConfig['scenarios'][number]
