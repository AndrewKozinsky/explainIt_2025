import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import {
	ResponseFormatJSONObject,
	ResponseFormatJSONSchema,
	ResponseFormatText,
	ReasoningEffort,
} from 'openai/resources'
import { MimoModels } from 'types/AIModels'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from '../mainConfig/mainConfig.service'

/**
 * Параметры рассуждения для запроса к Xiaomi MiMo.
 * MiMo — модель с рассуждением, поэтому без reasoningEffort оно явно выключается.
 * Уровни усилия API не документирует: любой reasoningEffort просто включает рассуждение.
 */
function getThinkingParams(reasoningEffort?: ReasoningEffort) {
	if (!reasoningEffort || reasoningEffort === 'none') {
		return { thinking: { type: 'disabled' } }
	}

	return { thinking: { type: 'enabled' } }
}

/** Клиент Xiaomi MiMo (OpenAI-совместимый API). */
@Injectable()
export class MimoService {
	mimo: OpenAI

	constructor(private mainConfig: MainConfigService) {
		this.mimo = new OpenAI({
			apiKey: this.mainConfig.get().mimo.apiKey,
			baseURL: this.mainConfig.get().mimo.baseUrl,
		})
	}

	async generateText(input: {
		messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
		responseFormat?: ResponseFormatText | ResponseFormatJSONSchema | ResponseFormatJSONObject
		model?: string
		reasoningEffort?: ReasoningEffort
		lowPriority?: boolean
	}) {
		const response = await this.mimo.chat.completions.create({
			model: input.model ?? MimoModels.Flash,
			messages: input.messages,
			response_format: input.responseFormat ?? {
				type: 'text',
			},
			...getThinkingParams(input.reasoningEffort),
		})

		if (!response.usage) {
			throw new CustomError(errorMessage.unknownOpenAIError, ErrorStatusCode.InternalServerError_500)
		}

		return {
			inputTokens: response.usage.prompt_tokens,
			outputTokens: response.usage.completion_tokens,
			message: response?.choices[0]?.message?.content as null | string,
		}
	}

	async *generateTextStreamChunks(input: {
		messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
		model?: string
		responseFormat?: ResponseFormatText | ResponseFormatJSONObject
		reasoningEffort?: ReasoningEffort
		abortSignal?: AbortSignal
		onUsage?: (usage: null | { inputTokens: number; outputTokens: number }) => void
		lowPriority?: boolean
	}): AsyncGenerator<string, void, void> {
		const stream = await this.mimo.chat.completions.create(
			{
				model: input.model ?? MimoModels.Flash,
				messages: input.messages,
				response_format: input.responseFormat ?? {
					type: 'text',
				},
				...getThinkingParams(input.reasoningEffort),
				stream: true,
				stream_options: {
					include_usage: true,
				},
			},
			{
				signal: input.abortSignal,
			},
		)

		let usageSent = false

		function maybeSendUsage(usage: null | { inputTokens: number; outputTokens: number }) {
			if (usageSent) return

			usageSent = true
			input.onUsage?.(usage)
		}

		try {
			for await (const event of stream) {
				const usage = event.usage

				if (usage) {
					maybeSendUsage({
						inputTokens: usage.prompt_tokens,
						outputTokens: usage.completion_tokens,
					})
				}

				const deltaText = event.choices?.[0]?.delta?.content
				if (!deltaText) continue

				yield deltaText
			}
		} finally {
			maybeSendUsage(null)
		}
	}
}
