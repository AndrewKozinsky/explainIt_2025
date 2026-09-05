import { Language } from 'utils/languages'

export type AiDialogueScenarioSeedData = {
	slug: string
	title: string
	description: string
	systemPrompt: string
}

/**
 * Упаковывает переводы названия/описания сценария в JSON-строку,
 * которую хранит колонка `title`/`description` (формат всегда JSON).
 */
export function localized(translations: Partial<Record<Language, string>>): string {
	return JSON.stringify(translations)
}
