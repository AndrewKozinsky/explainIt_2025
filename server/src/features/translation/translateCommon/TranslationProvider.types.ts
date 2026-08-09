import { AiModel } from 'types/AIModels'

export interface TranslationProviderUsage {
	model: AiModel
	inputTokens: number
	outputTokens: number
	/** Только для OpenAI — снижает стоимость вдвое */
	lowPriority?: boolean
}
