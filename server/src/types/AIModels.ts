export type AIProviderName = 'deepseek' | 'chatgpt' | 'gemini' | 'zai' | 'mimo'

export enum OpenAIModels {
	Nano = 'gpt-6-luna',
	Mini = 'gpt-6.1-terra',
	Standard = 'gpt-6.1-sol',
}

export enum DeepSeekModels {
	Flash = 'deepseek-flash',
	Pro = 'deepseek-v4-pro',
}

// Идентификаторы моделей z.ai (GLM).
export enum ZaiModels {
	Flash = 'glm-5.3-flash',
	Pro = 'glm-5.3',
}

// Идентификаторы моделей Xiaomi MiMo.
export enum MimoModels {
	Flash = 'mimo-v2.6-flash',
	Pro = 'mimo-v2.6-pro',
}

export enum GoogleGeminiModels {
	FlashLite = 'gemini-flash-lite-latest',
	Flash = 'gemini-flash-latest',
	Pro = 'gemini-pro-latest',
}

export type AiModel = OpenAIModels | DeepSeekModels | GoogleGeminiModels | ZaiModels | MimoModels

export function getProviderFromModel(model: AiModel): AIProviderName {
	if (Object.values(OpenAIModels).includes(model as OpenAIModels)) return 'chatgpt'
	if (Object.values(DeepSeekModels).includes(model as DeepSeekModels)) return 'deepseek'
	if (Object.values(GoogleGeminiModels).includes(model as GoogleGeminiModels)) return 'gemini'
	if (Object.values(ZaiModels).includes(model as ZaiModels)) return 'zai'
	if (Object.values(MimoModels).includes(model as MimoModels)) return 'mimo'

	throw new Error(`Unknown LLM model: ${model}`)
}

/** Дешёвая/быстрая модель по умолчанию (flash-тир). */
export const DEFAULT_FLASH_AI_MODEL: AiModel = DeepSeekModels.Flash

/** Более «умная» модель по умолчанию (pro-тир). */
export const DEFAULT_SMART_AI_MODEL: AiModel = DeepSeekModels.Pro
