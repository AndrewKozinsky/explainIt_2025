/** Цены LLM за 1M токенов в долларах. cachedInput — цена входных токенов, найденных в кэше провайдера. */
export type LlmTokenPrice = {
	inputPerMillionTokens: number
	cachedInputPerMillionTokens: number
	outputPerMillionTokens: number
}

/** Короткая запись цен LLM в mainConfig: входные, кэшированные входные и выходные токены за 1M. */
export function llmTokenPrice(prices: { input: number; cachedInput: number; output: number }): LlmTokenPrice {
	return {
		inputPerMillionTokens: prices.input,
		cachedInputPerMillionTokens: prices.cachedInput,
		outputPerMillionTokens: prices.output,
	}
}
