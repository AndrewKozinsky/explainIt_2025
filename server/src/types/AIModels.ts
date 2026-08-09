export type AIProviderName = 'deepseek' | 'chatgpt' | 'gemini'

export enum OpenAIModels {
	Standard = 'gpt-5',
	Mini = 'gpt-5-mini',
	Nano = 'gpt-5-nano',
}

export enum DeepSeekModels {
	Flash = 'deepseek-v4-flash',
	Pro = 'deepseek-v4-pro',
}

export enum GoogleGeminiModels {
	FlashLite = 'gemini-flash-lite-latest',
	Flash = 'gemini-flash-latest',
	Pro = 'gemini-pro-latest',
}

export type AiModel = OpenAIModels | DeepSeekModels | GoogleGeminiModels

export function getProviderFromModel(model: AiModel): AIProviderName {
	if (Object.values(OpenAIModels).includes(model as OpenAIModels)) return 'chatgpt'
	if (Object.values(DeepSeekModels).includes(model as DeepSeekModels)) return 'deepseek'
	if (Object.values(GoogleGeminiModels).includes(model as GoogleGeminiModels)) return 'gemini'

	throw new Error(`Unknown LLM model: ${model}`)
}

/** Модель по умолчанию, когда model не указана. */
export const DEFAULT_AI_MODEL: AiModel = DeepSeekModels.Flash
