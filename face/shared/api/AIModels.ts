/**
 * Перечисление AI-моделей, доступных для использования.
 *
 * Значения взяты из server/src/types/AIModels.ts.
 * Этот файл — единственный источник правды для имён моделей на клиенте.
 * Все методы, принимающие модель, должны требовать `AiModel`, а не `string`.
 */

export enum OpenAIModels {
	Nano = 'gpt-6-luna',
	Mini = 'gpt-6.1-terra',
	Standard = 'gpt-6.1-sol',
}

export enum DeepSeekModels {
	Flash = 'deepseek-flash',
	Pro = 'deepseek-v4-pro',
}

export enum ZaiModels {
	Flash = 'glm-5.3-flash',
	Pro = 'glm-5.3',
}

export enum GoogleGeminiModels {
	FlashLite = 'gemini-flash-lite-latest',
	Flash = 'gemini-flash-latest',
	Pro = 'gemini-pro-latest',
}

export type AiModel = OpenAIModels | DeepSeekModels | GoogleGeminiModels | ZaiModels
