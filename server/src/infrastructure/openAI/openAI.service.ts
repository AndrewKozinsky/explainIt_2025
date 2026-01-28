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

export enum OpenAIModels {
	Standard = 'gpt-5',
	Mini = 'gpt-5-mini',
	Nano = 'gpt-5-nano',
}

@Injectable()
export class OpenAIService {
	openai: OpenAI

	constructor(private mainConfig: MainConfigService) {
		this.openai = new OpenAI({
			apiKey: this.mainConfig.get().openAI.apiKey,
		})
	}

	// TODO: В будущем нужно подумать можно ли объединить generateText и generateTextStreamChunks в один метод

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
	}) {
		const response = await this.openai.chat.completions.create({
			model: input.model ?? OpenAIModels.Nano,
			reasoning_effort: input.reasoningEffort,
			messages: input.messages,
			response_format: input.responseFormat ?? {
				type: 'text',
			},
			service_tier: 'flex',
		})

		if (!response.usage) {
			throw new CustomGraphQLError(errorMessage.unknownOpenAIError, ErrorCode.InternalServerError_500)
		}

		return {
			// Сколько токенов ушло на запрос.
			// Считается по меньшей стоимости
			inputTokens: response.usage.prompt_tokens, // 295
			// Сколько токенов модель сгенерировала в ответе. // 3968
			// Считается по большей стоимости
			outputTokens: response.usage.completion_tokens,
			message: response?.choices[0]?.message?.content as null | string,
		}
	}

	async *generateTextStreamChunks(input: {
		messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]
		model?: OpenAIModels
		reasoningEffort?: ReasoningEffort
		abortSignal?: AbortSignal
	}): AsyncGenerator<string, void, void> {
		const stream = await this.openai.chat.completions.create(
			{
				model: input.model ?? OpenAIModels.Nano,
				reasoning_effort: input.reasoningEffort,
				messages: input.messages,
				response_format: {
					type: 'text',
				},
				service_tier: 'flex',
				stream: true,
			},
			{
				signal: input.abortSignal,
			},
		)

		for await (const event of stream) {
			const deltaText = event.choices?.[0]?.delta?.content
			if (!deltaText) continue
			yield deltaText
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
