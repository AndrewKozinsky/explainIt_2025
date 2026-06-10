import { Injectable } from '@nestjs/common'
import { TranslationProviderName } from 'features/translation/translateCommon/TranslationProvider.types'
import { ChatGptLlmProvider } from './ChatGptLlmProvider.service'
import { DeepSeekLlmProvider } from './DeepSeekLlmProvider.service'
import { GeminiLlmProvider } from './GeminiLlmProvider.service'
import { LlmGenerateOutput, LlmGenerateWithProvider, LlmProvider, LlmStreamWithProvider } from './LlmProvider.interface'

/**
 * Единый фасад для вызова любого LLM-провайдера.
 *
 * Использование:
 *   llmAdapter.generate({ provider: 'chatgpt', messages: [...] })
 *   llmAdapter.stream({ provider: 'gemini', messages: [...] })
 *
 * Сам выбирает нужный адаптер и делегирует ему вызов.
 */
@Injectable()
export class LlmAdapterService {
	private providerMap: Record<TranslationProviderName, LlmProvider>

	constructor(gemini: GeminiLlmProvider, chatGpt: ChatGptLlmProvider, deepSeek: DeepSeekLlmProvider) {
		this.providerMap = {
			gemini,
			chatgpt: chatGpt,
			deepseek: deepSeek,
		}
	}

	async generate(input: LlmGenerateWithProvider): Promise<LlmGenerateOutput> {
		return this.providerMap[input.provider].generate(input)
	}

	async *stream(input: LlmStreamWithProvider): AsyncGenerator<string, void, void> {
		for await (const chunk of this.providerMap[input.provider].stream(input)) {
			yield chunk
		}
	}
}
