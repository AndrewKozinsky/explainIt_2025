import { Injectable } from '@nestjs/common'
import { AiModel, AIProviderName, DEFAULT_FLASH_AI_MODEL, getProviderFromModel } from 'types/AIModels'
import { withTimeout } from 'utils/withTimeout'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { ChatGptLlmProvider } from './ChatGptLlmProvider.service'
import { DeepSeekLlmProvider } from './DeepSeekLlmProvider.service'
import { GeminiLlmProvider } from './GeminiLlmProvider.service'
import { LlmGenerateInput, LlmGenerateOutput, LlmProvider, LlmStreamInput } from './LlmProvider.interface'
import { MimoLlmProvider } from './MimoLlmProvider.service'
import { ZaiLlmProvider } from './ZaiLlmProvider.service'

/**
 * Единый фасад для вызова любого LLM-провайдера.
 *
 * Провайдер определяется из model (enum). Если model не указана — используется DEFAULT_FLASH_AI_MODEL.
 *
 * Использование:
 *   llmAdapter.generate({ model: OpenAIModels.Standard, messages: [...] })
 *   llmAdapter.generate({ messages: [...] })  // DEFAULT_FLASH_AI_MODEL
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
		mimo: MimoLlmProvider,
	) {
		this.providerMap = {
			gemini,
			chatgpt: chatGpt,
			deepseek: deepSeek,
			zai,
			mimo,
		}
	}

	/** Возвращает ответ, токены и модель, которая на самом деле ответила (нужна для расчёта стоимости). */
	async generate(input: LlmGenerateInput): Promise<LlmGenerateOutput & { model: AiModel }> {
		const model = input.model ?? DEFAULT_FLASH_AI_MODEL
		const provider = getProviderFromModel(model)

		const output = await withTimeout(
			this.providerMap[provider].generate(input),
			input.timeoutMs ?? LlmAdapterService.GENERATE_TIMEOUT_MS,
			() => new CustomError(errorMessage.llm.llmTimeout, ErrorStatusCode.GatewayTimeout_504),
		)

		return { ...output, model }
	}

	async *stream(input: LlmStreamInput): AsyncGenerator<string, void, void> {
		const provider = getProviderFromModel(input.model ?? DEFAULT_FLASH_AI_MODEL)
		for await (const chunk of this.providerMap[provider].stream(input)) {
			yield chunk
		}
	}
}
