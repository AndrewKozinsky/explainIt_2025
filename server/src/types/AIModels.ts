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
