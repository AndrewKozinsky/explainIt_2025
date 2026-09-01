import { Injectable } from '@nestjs/common'
import { AIProviderName, getProviderFromModel, DEFAULT_FLASH_AI_MODEL } from 'types/AIModels'
import { withTimeout } from 'utils/withTimeout'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { ChatGptLlmProvider } from './ChatGptLlmProvider.service'
import { DeepSeekLlmProvider } from './DeepSeekLlmProvider.service'
import { GeminiLlmProvider } from './GeminiLlmProvider.service'
import { LlmGenerateInput, LlmGenerateOutput, LlmProvider, LlmStreamInput } from './LlmProvider.interface'
import { ZaiLlmProvider } from './ZaiLlmProvider.service'

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
	/**
	 * Дефолтный таймаут синхронной генерации — намеренно очень большой.
	 *
	 * Фоновые задачи (например, генерация субтитров) могут идти долго, и клиент
	 * их не ждёт, поэтому по умолчанию запрос к LLM не должен обрываться.
	 * Там, где нужен жёсткий лимит (например, синхронный перевод фразы, который
	 * должен уложиться в proxy_read_timeout nginx) — передаётся явный timeoutMs.
	 */
	private static readonly GENERATE_TIMEOUT_MS = 60 * 60 * 1000 // 1 час

	private providerMap: Record<AIProviderName, LlmProvider>

	constructor(
		gemini: GeminiLlmProvider,
		chatGpt: ChatGptLlmProvider,
		deepSeek: DeepSeekLlmProvider,
		zai: ZaiLlmProvider,
	) {
		this.providerMap = {
			gemini,
			chatgpt: chatGpt,
			deepseek: deepSeek,
			zai,
		}
	}

	async generate(input: LlmGenerateInput): Promise<LlmGenerateOutput> {
		const provider = getProviderFromModel(input.model ?? DEFAULT_FLASH_AI_MODEL)
		return withTimeout(
			this.providerMap[provider].generate(input),
			input.timeoutMs ?? LlmAdapterService.GENERATE_TIMEOUT_MS,
			() => new CustomError(errorMessage.llm.llmTimeout, ErrorStatusCode.GatewayTimeout_504),
		)
	}

	async *stream(input: LlmStreamInput): AsyncGenerator<string, void, void> {
		const provider = getProviderFromModel(input.model ?? DEFAULT_FLASH_AI_MODEL)
		for await (const chunk of this.providerMap[provider].stream(input)) {
			yield chunk
		}
	}
}
