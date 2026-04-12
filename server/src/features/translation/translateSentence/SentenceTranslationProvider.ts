import { OpenAIModels } from 'types/openAIModels'

export type SentenceTranslationProviderName = 'deepseek' | 'chatgpt'

export type SentenceTranslationProviderUsage =
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

export interface SentenceTranslationProvider {
	readonly providerName: SentenceTranslationProviderName
	translate(input: {
		text: string
		sourceLanguageCode: string
		targetLanguageCode: string
		lowPriority?: boolean
		bookName?: string
		bookAuthor?: string
		videoName?: string
		videoYear?: string | number
	}): Promise<{ translatedText: string; usage: null | SentenceTranslationProviderUsage }>
}
