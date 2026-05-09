import { OpenAIModels } from 'types/openAIModels'
import { LanguageCode } from 'prisma/generated/enums'

export type TranslationProviderName = 'deepseek' | 'chatgpt' | 'gemini'

export type TranslationProviderUsage =
	| {
			provider: 'deepseek'
			inputTokens: number
			outputTokens: number
	  }
	| {
			provider: 'chatgpt'
			inputTokens: number
			outputTokens: number
			model: OpenAIModels
			lowPriority: boolean
	  }
	| {
			provider: 'gemini'
			inputTokens: number
			outputTokens: number
	  }

export type BuildSentencePromptFn = (input: {
	sourceLanguageCode: LanguageCode
	bookName?: string
	bookAuthor?: string
	videoName?: string
	videoYear?: string | number
}) => string

export type BuildPhrasePromptFn = (input: {
	sourceLanguageCode: LanguageCode
	sentenceText: string
	selectedWord: string
	selectedWordStartOffset: number
	selectedWordEndOffset: number
	bookName?: string
	bookAuthor?: string
	videoName?: string
	videoYear?: string | number
}) => string

export interface SentenceTranslationProvider {
	readonly providerName: TranslationProviderName
	translate(
		input: {
			text: string
			sourceLanguageCode: string
			lowPriority?: boolean
			bookName?: string
			bookAuthor?: string
			videoName?: string
			videoYear?: string | number
		},
		buildPrompt: BuildSentencePromptFn,
	): Promise<{ translatedText: string; usage: null | TranslationProviderUsage }>
}

export interface PhraseTranslationProvider {
	readonly providerName: TranslationProviderName
	translatePhrase(
		input: {
			text: string
			selectedWord: string
			selectedWordStartOffset: number
			selectedWordEndOffset: number
			sourceLanguageCode: string
			bookName?: string
			bookAuthor?: string
			videoName?: string
			videoYear?: string | number
		},
		buildPrompt: BuildPhrasePromptFn,
	): Promise<{ message: string; inputTokens: number; outputTokens: number }>
}
