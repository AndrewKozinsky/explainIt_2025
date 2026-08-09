import { Injectable } from '@nestjs/common'
import { AIProviderName, getProviderFromModel, DEFAULT_AI_MODEL } from 'types/AIModels'
import { ChatGptLlmProvider } from './ChatGptLlmProvider.service'
import { DeepSeekLlmProvider } from './DeepSeekLlmProvider.service'
import { GeminiLlmProvider } from './GeminiLlmProvider.service'
import { LlmGenerateInput, LlmGenerateOutput, LlmProvider, LlmStreamInput } from './LlmProvider.interface'

/**
 * Единый фасад для вызова любого LLM-провайдера.
 *
 * Провайдер определяется из model (enum). Если model не указана — по умолчанию DeepSeek.
 *
 * Использование:
 *   llmAdapter.generate({ model: OpenAIModels.Standard, messages: [...] })
 *   llmAdapter.generate({ messages: [...] })  // DeepSeek по умолчанию
 */
@Injectable()
export class LlmAdapterService {
	private providerMap: Record<AIProviderName, LlmProvider>

	constructor(gemini: GeminiLlmProvider, chatGpt: ChatGptLlmProvider, deepSeek: DeepSeekLlmProvider) {
		this.providerMap = {
			gemini,
			chatgpt: chatGpt,
			deepseek: deepSeek,
		}
	}

	async generate(input: LlmGenerateInput): Promise<LlmGenerateOutput> {
		const provider = getProviderFromModel(input.model ?? DEFAULT_AI_MODEL)
		return this.providerMap[provider].generate(input)
	}

	async *stream(input: LlmStreamInput): AsyncGenerator<string, void, void> {
		const provider = getProviderFromModel(input.model ?? DEFAULT_AI_MODEL)
		for await (const chunk of this.providerMap[provider].stream(input)) {
			yield chunk
		}
	}
}
