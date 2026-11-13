import OpenAI from 'openai'

/** Токены одного запроса к LLM. inputTokens включает cachedInputTokens: кэшированные входные токены дешевле. */
export type LlmTokenUsage = {
	inputTokens: number
	cachedInputTokens: number
	outputTokens: number
}

/**
 * Переводит usage из OpenAI-совместимого ответа (OpenAI, DeepSeek, z.ai, MiMo) в LlmTokenUsage.
 * OpenAI, z.ai и MiMo сообщают кэш в prompt_tokens_details.cached_tokens, DeepSeek — в prompt_cache_hit_tokens.
 */
export function toLlmTokenUsage(usage: OpenAI.CompletionUsage & { prompt_cache_hit_tokens?: number }): LlmTokenUsage {
	return {
		inputTokens: usage.prompt_tokens,
		cachedInputTokens: usage.prompt_tokens_details?.cached_tokens ?? usage.prompt_cache_hit_tokens ?? 0,
		outputTokens: usage.completion_tokens,
	}
}
