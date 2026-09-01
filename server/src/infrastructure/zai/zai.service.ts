import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import {
	ResponseFormatJSONObject,
	ResponseFormatJSONSchema,
	ResponseFormatText,
	ReasoningEffort,
} from 'openai/resources'
import { ZaiModels } from 'types/AIModels'
import { CustomError } from 'infrastructure/exceptions/customErrors'
import { errorMessage } from 'infrastructure/exceptions/errorMessage'
import { ErrorStatusCode } from 'infrastructure/exceptions/errorStatusCode'
import { MainConfigService } from '../mainConfig/mainConfig.service'

@Injectable()
export class ZaiService {
	zai: OpenAI

	constructor(private mainConfig: MainConfigService) {
		this.zai = new OpenAI({
			apiKey: this.mainConfig.get().zai.apiKey,
			baseURL: this.mainConfig.get().zai.baseUrl,
		})
	}

	async generateText(input: {
		messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
		responseFormat?: ResponseFormatText | ResponseFormatJSONSchema | ResponseFormatJSONObject
		model?: string
		reasoningEffort?: ReasoningEffort
		lowPriority?: boolean
	}) {
		const response = await this.zai.chat.completions.create({
			model: input.model ?? ZaiModels.Flash,
			messages: input.messages,
			response_format: input.responseFormat ?? {
				type: 'text',
			},
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
		reasoningEffort?: ReasoningEffort
		abortSignal?: AbortSignal
		onUsage?: (usage: null | { inputTokens: number; outputTokens: number }) => void
		lowPriority?: boolean
	}): AsyncGenerator<string, void, void> {
		const stream = await this.zai.chat.completions.create(
			{
				model: input.model ?? ZaiModels.Flash,
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

export interface ZaiServiceI {
	generateText(prompt: string): Promise<string>
}

@Injectable()
export class ZaiServiceMock implements ZaiServiceI {
	constructor() {}

	async generateText(prompt: string): Promise<any> {
		return {
			inputTokens: 100,
			outputTokens: 3000,
			message: 'Z.ai message',
		}
	}
}
