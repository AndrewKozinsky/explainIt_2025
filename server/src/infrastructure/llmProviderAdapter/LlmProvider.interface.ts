import { TranslationProviderName } from 'features/translation/translateCommon/TranslationProvider.types'

// Нейтральный формат сообщения — единый для всех провайдеров.
// Совместим с OpenAI SDK (де-факто стандарт).
export type LlmMessage = {
	role: 'system' | 'user' | 'assistant'
	content: string
}

// ---- Синхронная генерация ----

export type LlmGenerateInput = {
	messages: LlmMessage[]
	responseFormat?: 'text' | 'json_object'
	reasoningEffort?: 'low' | 'medium' | 'high'
	lowPriority?: boolean
}

export type LlmGenerateOutput = {
	content: string
	inputTokens: number
	outputTokens: number
}

// ---- Потоковая генерация ----

export type LlmStreamInput = {
	messages: LlmMessage[]
	abortSignal?: AbortSignal
	onUsage?: (usage: null | { inputTokens: number; outputTokens: number }) => void
	lowPriority?: boolean
}

// ---- Интерфейс провайдера ----

export interface LlmProvider {
	readonly name: TranslationProviderName

	/** Синхронная генерация (перевод, транскрипция, извлечение грамматики). */
	generate(input: LlmGenerateInput): Promise<LlmGenerateOutput>

	/** Потоковая генерация (чат, SSE). */
	stream(input: LlmStreamInput): AsyncGenerator<string, void, void>
}

// ---- Входные типы с указанием провайдера (для LlmAdapterService) ----

export type LlmGenerateWithProvider = LlmGenerateInput & {
	provider: TranslationProviderName
}

export type LlmStreamWithProvider = LlmStreamInput & {
	provider: TranslationProviderName
}
