import { AiModel, AIProviderName } from 'types/AIModels'

// Нейтральный формат сообщения — единый для всех провайдеров.
// Совместим с OpenAI SDK (де-факто стандарт).
export type LlmMessage = {
	role: 'system' | 'user' | 'assistant'
	content: string
}

// ---- Синхронная генерация ----

export type LlmGenerateInput = {
	messages: LlmMessage[]
	/** Model override. If omitted, the provider's default is used. */
	model?: AiModel
	responseFormat?: 'text' | 'json_object'
	reasoningEffort?: 'low' | 'medium' | 'high'
	lowPriority?: boolean
	/**
	 * Максимальное время ожидания ответа от LLM в миллисекундах.
	 * Если не указано — используется LlmAdapterService.GENERATE_TIMEOUT_MS (очень большой дефолт).
	 */
	timeoutMs?: number
}

export type LlmGenerateOutput = {
	content: string
	inputTokens: number
	outputTokens: number
}

// ---- Потоковая генерация ----

export type LlmStreamInput = {
	messages: LlmMessage[]
	/** Model override. If omitted, the provider's default is used. */
	model?: AiModel
	responseFormat?: 'text' | 'json_object'
	abortSignal?: AbortSignal
	onUsage?: (usage: null | { inputTokens: number; outputTokens: number }) => void
	lowPriority?: boolean
}

// ---- Интерфейс провайдера ----

export interface LlmProvider {
	readonly name: AIProviderName

	/** Синхронная генерация (перевод, транскрипция, извлечение грамматики). */
	generate(input: LlmGenerateInput): Promise<LlmGenerateOutput>

	/** Потоковая генерация (чат, SSE). */
	stream(input: LlmStreamInput): AsyncGenerator<string, void, void>
}
