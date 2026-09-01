import { Language } from 'utils/languages'

export type AiDialogueScenarioSeedData = {
	slug: string
	title: string
	description: string
	systemPrompt: string
	languageCode: Language
}
