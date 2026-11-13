import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import {
	ReasoningEffort,
	ResponseFormatJSONObject,
	ResponseFormatJSONSchema,
	ResponseFormatText,
} from 'openai/resources'
import { OpenAIModels } from 'types/AIModels'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { LlmTokenUsage, toLlmTokenUsage } from 'infrastructure/llmProviderAdapter/llmTokenUsage'
import { MainConfigService } from '../mainConfig/mainConfig.service'

@Injectable()
export class OpenAIService {
	openai: OpenAI

	constructor(private mainConfig: MainConfigService) {
		this.openai = new OpenAI({
			apiKey: this.mainConfig.get().openAI.apiKey,
		})
	}

	/**
	 * Отправляет ИИ запрос
	 * @param input — данные для формирования запроса
	 */
	async generateText(input: {
		// Сообщения для ИИ
		messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
		// Формат ответа. По умолчанию JSON
		// Подробнее: https://platform.openai.com/docs/guides/chat/response-format
		responseFormat?: ResponseFormatText | ResponseFormatJSONSchema | ResponseFormatJSONObject
		model?: OpenAIModels
		// Уровень «обдумывания» ответа. Если не указывать, то ChatGPT будет выбирать его самостоятельно в зависимости от вопроса
		reasoningEffort?: ReasoningEffort
		lowPriority?: boolean
	}) {
		const response = await this.openai.chat.completions.create({
			model: input.model ?? OpenAIModels.Nano,
			reasoning_effort: input.reasoningEffort,
			messages: input.messages,
			response_format: input.responseFormat ?? {
				type: 'text',
			},
			service_tier: input.lowPriority ? 'flex' : 'default',
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
		model?: OpenAIModels
		responseFormat?: ResponseFormatText | ResponseFormatJSONObject
		reasoningEffort?: ReasoningEffort
		abortSignal?: AbortSignal
		onUsage?: (usage: null | LlmTokenUsage) => void
		lowPriority?: boolean
	}): AsyncGenerator<string, void, void> {
		const stream = await this.openai.chat.completions.create(
			{
				model: input.model ?? OpenAIModels.Nano,
				reasoning_effort: input.reasoningEffort,
				messages: input.messages,
				response_format: input.responseFormat ?? {
					type: 'text',
				},
				service_tier: input.lowPriority ? 'flex' : 'default',
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
			// If the stream ends without usage (e.g. client aborted), report null.
			maybeSendUsage(null)
		}
	}
}

export interface OpenAIServiceI {
	generateText(prompt: string): Promise<string>
}

@Injectable()
export class OpenAIServiceMock implements OpenAIServiceI {
	constructor() {}

	async generateText(prompt: string): Promise<any> {
		return {
			inputTokens: 100,
			outputTokens: 3000,
			message: 'OpenAI message',
		}
	}
}
