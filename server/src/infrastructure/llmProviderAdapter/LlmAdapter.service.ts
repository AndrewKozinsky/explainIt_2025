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
	 * Дефолтный таймаут синхронной генерации.
	 *
	 * Должен быть заметно меньше proxy_read_timeout nginx (60с по умолчанию),
	 * чтобы в случае зависшего LLM успела сработать обработка ошибки
	 * (CustomError → GlobalExceptionFilter) и ответ дошёл до клиента до 504.
	 */
	private static readonly GENERATE_TIMEOUT_MS = 55_000

	private providerMap: Record<AIProviderName, LlmProvider>

	constructor(gemini: GeminiLlmProvider, chatGpt: ChatGptLlmProvider, deepSeek: DeepSeekLlmProvider) {
		this.providerMap = {
			gemini,
			chatgpt: chatGpt,
			deepseek: deepSeek,
		}
	}

	async generate(input: LlmGenerateInput): Promise<LlmGenerateOutput> {
		const provider = getProviderFromModel(input.model ?? DEFAULT_FLASH_AI_MODEL)
		return withTimeout(
			this.providerMap[provider].generate(input),
			input.timeoutMs ?? LlmAdapterService.GENERATE_TIMEOUT_MS,
			() => new CustomError(errorMessage.llm.llmTimeout, ErrorStatusCode.InternalServerError_500),
		)
	}

	async *stream(input: LlmStreamInput): AsyncGenerator<string, void, void> {
		const provider = getProviderFromModel(input.model ?? DEFAULT_FLASH_AI_MODEL)
		for await (const chunk of this.providerMap[provider].stream(input)) {
			yield chunk
		}
	}
}
