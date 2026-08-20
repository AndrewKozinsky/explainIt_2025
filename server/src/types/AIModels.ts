export type AIProviderName = 'deepseek' | 'chatgpt' | 'gemini'

export enum OpenAIModels {
	Nano = 'gpt-5.6-luna',
	Mini = 'gpt-5.6-terra',
	Standard = 'gpt-5.6-sol',
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

/** Дешёвая/быстрая модель по умолчанию (flash-тир). */
export const DEFAULT_FLASH_AI_MODEL: AiModel = DeepSeekModels.Flash

/** Более «умная» модель по умолчанию (pro-тир). */
export const DEFAULT_SMART_AI_MODEL: AiModel = DeepSeekModels.Pro
