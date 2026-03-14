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

export type SentenceTranslationProviderStreamEvent =
	| { type: 'chunk'; text: string }
	| { type: 'done'; usage: null | SentenceTranslationProviderUsage }

export interface SentenceTranslationProvider {
	readonly providerName: SentenceTranslationProviderName
	streamTranslate(input: {
		text: string
		sourceLanguageCode: string
		targetLanguageCode: string
		abortSignal?: AbortSignal
		lowPriority?: boolean
		bookName?: string
		bookAuthor?: string
		videoName?: string
		videoYear?: string | number
	}): AsyncGenerator<SentenceTranslationProviderStreamEvent>
}
