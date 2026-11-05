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
	/**
	 * «Куда может повернуть»: 2–4 идеи, как пользователь может повести разговор (localizedList).
	 * Пишутся как действия пользователя, а не события сцены. Видны только пользователю, в промпт не попадают.
	 */
	conversationIdeas: string
	/** «Что тренирует»: одна строка о том, чему научится пользователь (localized). В промпт не попадает. */
	trainedSkills: string
}

export type PublicAiDialogueScenarioSeedData = AiDialogueScenarioSeedData & { coverS3Key: string }

/**
 * Упаковывает переводы названия/описания сценария в JSON-строку,
 * которую хранит колонка `title`/`description` (формат всегда JSON).
 */
export function localized(translations: Partial<Record<Language, string>>): string {
	return JSON.stringify(translations)
}

/**
 * Упаковывает переводы списка (например, идей разговора) в JSON-строку вида `{"en":["...","..."]}`,
 * которую хранит колонка `conversation_ideas`.
 */
export function localizedList(translations: Partial<Record<Language, string[]>>): string {
	return JSON.stringify(translations)
}
