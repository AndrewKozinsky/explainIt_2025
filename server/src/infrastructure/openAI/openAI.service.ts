import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import { MainConfigService } from '../mainConfig/mainConfig.service'

enum OpenAIModels {
	'gpt4oMini' = 'gpt-4o-mini',
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
	 * Отправляет ИИ вопрос на который нужно получить ответ
	 * @param prompt — текст вопроса
	 * @param model
	 */
	async generateText(prompt: string, model: OpenAIModels = OpenAIModels.gpt4oMini) {
		if (!prompt) {
			console.log('Error in OpenAIService => generateText. Empty prompt.')
			return ''
		}

		try {
			const response = await this.openai.responses.create({
				model: model,
				input: prompt,
				store: true,
			})

			return response.output_text
		} catch (error: unknown) {
			console.log('Error in OpenAIService => generateText.', error)
		}
	}

	/**
	 * Отправляет ИИ вопрос, на который нужно получить ответ.
	 * @param question — текст вопроса
	 * @param model — используемая модель ГигаЧата
	 */
	/*private async makeGenerateTextRequest(question: string, model: OpenAIModel) {
		const requestBody = {
			model,
			messages: [
				{
					role: 'user',
					content: question,
				},
			],
			temperature: 1,
			top_p: 0.1,
			n: 1,
			stream: false,
			max_tokens: 512,
			repetition_penalty: 1,
		}

		try {
			return new Promise((resolve, reject) => {
				fetch('https://OpenAI.devices.sberbank.ru/api/v1/chat/completions', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						Authorization: 'Bearer ' + this.accessToken,
					},
					body: JSON.stringify(requestBody),
				})
					.then((res) => res.json())
					.then((data) => {
						resolve(data)
					})
			})
		} catch (err: unknown) {
			console.log('Error in OpenAIService => makeGenerateTextRequest')

			if (err instanceof Error) {
				return err.message
			}

			return null
		}
	}*/
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
