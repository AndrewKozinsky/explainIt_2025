import { Language } from 'utils/languages'

export type AiDialogueScenarioGroupSlug =
	'travel-abroad' | 'food-and-shopping' | 'city-and-services' | 'home-and-everyday-life'

export type AiDialogueScenarioGroupSeedData = {
	slug: AiDialogueScenarioGroupSlug
	title: string
	/** Почему стоит выбрать сценарий этой группы: польза для пользователя, а не пересказ названия. */
	description: string
}

export type AiDialogueScenarioSeedData = {
	slug: string
	groupSlug: AiDialogueScenarioGroupSlug
	title: string
	description: string
	systemPrompt: string
	/** Локализованный пример пожеланий к сцене для плейсхолдера окна запуска (localized). */
	userScenarioAmendmentHint?: string
}

export type PublicAiDialogueScenarioSeedData = AiDialogueScenarioSeedData & { coverS3Key: string }

/**
 * Упаковывает переводы названия/описания сценария в JSON-строку,
 * которую хранит колонка `title`/`description` (формат всегда JSON).
 */
export function localized(translations: Partial<Record<Language, string>>): string {
	return JSON.stringify(translations)
}
