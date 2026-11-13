import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import {
	ReasoningEffort,
	ResponseFormatJSONObject,
	ResponseFormatJSONSchema,
	ResponseFormatText,
} from 'openai/resources'
import { DeepSeekModels } from 'types/AIModels'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { LlmTokenUsage, toLlmTokenUsage } from 'infrastructure/llmProviderAdapter/llmTokenUsage'
import { MainConfigService } from '../mainConfig/mainConfig.service'

/**
 * Параметры рассуждения для запроса к DeepSeek.
 * API по умолчанию включает рассуждение с усилием high, поэтому без reasoningEffort оно явно выключается.
 */
function getThinkingParams(reasoningEffort?: ReasoningEffort) {
	if (!reasoningEffort || reasoningEffort === 'none') {
		return { thinking: { type: 'disabled' } }
	}

	return { thinking: { type: 'enabled' }, reasoning_effort: reasoningEffort }
}

@Injectable()
export class DeepSeekService {
	deepseek: OpenAI

	constructor(private mainConfig: MainConfigService) {
		this.deepseek = new OpenAI({
			apiKey: this.mainConfig.get().deepSeek.apiKey,
			baseURL: 'https://api.deepseek.com',
		})
	}

	async generateText(input: {
		messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
		responseFormat?: ResponseFormatText | ResponseFormatJSONSchema | ResponseFormatJSONObject
		model?: string
		reasoningEffort?: ReasoningEffort
		lowPriority?: boolean
	}) {
		const response = await this.deepseek.chat.completions.create({
			model: input.model ?? DeepSeekModels.Flash,
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
			...toLlmTokenUsage(response.usage),
			message: response?.choices[0]?.message?.content as null | string,
		}
	}

	async *generateTextStreamChunks(input: {
		messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
		model?: string
		responseFormat?: ResponseFormatText | ResponseFormatJSONObject
		reasoningEffort?: ReasoningEffort
		abortSignal?: AbortSignal
		onUsage?: (usage: null | LlmTokenUsage) => void
		lowPriority?: boolean
	}): AsyncGenerator<string, void, void> {
		const stream = await this.deepseek.chat.completions.create(
			{
				model: input.model ?? DeepSeekModels.Flash,
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

		function maybeSendUsage(usage: null | LlmTokenUsage) {
			if (usageSent) return

			usageSent = true
			input.onUsage?.(usage)
		}

		try {
			for await (const event of stream) {
				const usage = event.usage

				if (usage) {
					maybeSendUsage({
						...toLlmTokenUsage(usage),
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

export interface DeepSeekServiceI {
	generateText(prompt: string): Promise<string>
}

@Injectable()
export class DeepSeekServiceMock implements DeepSeekServiceI {
	constructor() {}

	async generateText(prompt: string): Promise<any> {
		return {
			inputTokens: 100,
			outputTokens: 3000,
			message: 'DeepSeek message',
		}
	}
}
