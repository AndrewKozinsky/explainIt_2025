import { LanguageCode, UniversalPhraseTranslationStatus } from 'prisma/generated/enums'

export type UniversalPhraseTranslationServiceModel = {
	id: number
	universalPhraseId: number
	targetLanguageCode: LanguageCode
	translation: null | UniversalPhraseTranslationData
	status: UniversalPhraseTranslationStatus
	errorMessage: null | string
	nonExistentWord: boolean
	createdAt: Date
}

/**
 * Структура результата перевода фразы через LLM.
 * Соответствует JSON-ответу из промпта.
 */
export type UniversalPhraseTranslationData = {
	coreIdea: string
	usageGroups: UsageGroup[]
	similarWords: null | string
	commonMistakes: null | string
	patterns: null | PatternItem[]
}

export type UsageGroup = {
	title: string
	explain: string
	examples: TranslationExample[]
}

export type TranslationExample = {
	sentence: string
	translate: string
}

export type PatternItem = {
	phrase: string
	translate: string
}
