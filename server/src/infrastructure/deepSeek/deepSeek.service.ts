import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import {
	ResponseFormatJSONObject,
	ResponseFormatJSONSchema,
	ResponseFormatText,
	ReasoningEffort,
} from 'openai/resources'
import { CustomGraphQLError } from 'infrastructure/exceptions/customErrors'
import { ErrorCode } from 'infrastructure/exceptions/errorCode'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { MainConfigService } from '../mainConfig/mainConfig.service'

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
			model: input.model ?? 'deepseek-chat',
			messages: input.messages,
			response_format: input.responseFormat ?? {
				type: 'text',
			},
		})

		if (!response.usage) {
			throw new CustomGraphQLError(errorMessage.unknownOpenAIError, ErrorCode.InternalServerError_500)
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
		reasoningEffort?: ReasoningEffort
		abortSignal?: AbortSignal
		onUsage?: (usage: null | { inputTokens: number; outputTokens: number }) => void
		lowPriority?: boolean
	}): AsyncGenerator<string, void, void> {
		const stream = await this.deepseek.chat.completions.create(
			{
				model: input.model ?? 'deepseek-chat',
				messages: input.messages,
				response_format: {
					type: 'text',
				},
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
