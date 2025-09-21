import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import {
	ResponseFormatJSONObject,
	ResponseFormatJSONSchema,
	ResponseFormatText,
	ReasoningEffort,
} from 'openai/resources'
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
			apiKey: mainConfig.get().openAI.apiKey,
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
	}) {
		try {
			const response = await this.openai.chat.completions.create({
				model: input.model ?? OpenAIModels.Nano,
				reasoning_effort: input.reasoningEffort,
				messages: input.messages,
				response_format: input.responseFormat ?? {
					type: 'json_object',
				},
			})

			if (!response.usage) {
				console.log('Error in OpenAIService => generateText.', 'No response')
				return
			}

			const resultObj = {
				// Сколько токенов ушло на запрос.
				// Считается по меньшей стоимости
				inputTokens: response.usage.prompt_tokens, // 295
				// Сколько токенов модель сгенерировала в ответе. // 3968
				// Считается по большей стоимости
				outputTokens: response.usage.completion_tokens,
				message: response.choices[0].message.content as string,
			}

			if (!resultObj.message) {
				console.log('Error in OpenAIService => generateText.', 'No message')
				return null
			}

			console.log(resultObj)

			return resultObj
		} catch (error: unknown) {
			console.log('Error in OpenAIService => generateText.', error)
			return null
		}
	}
}

export interface OpenAIServiceI {
	generateText(prompt: string): Promise<string>
}

@Injectable()
export class OpenAIServiceMock implements OpenAIServiceI {
	constructor() {}

	async generateText(prompt: string): Promise<string> {
		return '{"correct": false, "analysis": "Перевод написан неверно"}'
	}
}
