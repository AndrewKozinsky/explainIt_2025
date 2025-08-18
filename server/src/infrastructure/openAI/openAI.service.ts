import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import { MainConfigService } from '../mainConfig/mainConfig.service'

enum OpenAIModels {
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
	 * Отправляет ИИ вопрос на который нужно получить ответ
	 * @param prompt — текст вопроса
	 * @param model
	 */
	async generateText(prompt: string, model: OpenAIModels = OpenAIModels.Nano) {
		if (!prompt) {
			console.log('Error in OpenAIService => generateText. Empty prompt.')
			return ''
		}

		try {
			const response = await this.openai.chat.completions.create({
				model,
				messages: [
					{
						role: 'system',
						content: `Ты учитель английского. Контекст возьму из {Context}. Напиши перевод предложения {Sentence}. Отдельно разбери фразу {Phrase}. В ответе всегда JSON:
{"translate": "...", "phrase": "...", "examples": "..."}
- translate: перевод предложения на русский.
- phrase: объяснение фразы в контексте этого предложения.
- examples: 3 примера использования фразы в других предложениях с переводом.
}`,
					},
					{
						role: 'user',
						content: JSON.stringify({
							Sentence: 'This goal can seem out of reach because languages seem hard, but they’re not.',
							Phrase: 'out of reach',
							Context:
								'We want to walk up to someone, open our mouths, forget the rules, and speak automatically. This goal can seem out of reach because languages seem hard, but they’re not. There is no such thing as a “hard” language; any idiot can speak whatever language his parents spoke when he was a child. The real challenge lies in finding a path that conforms to the demands of a busy life.',
						}),
					},
				],
				response_format: {
					type: 'json_object',
				},
			})

			/*const response = await this.openai.responses.create({
				model: model,
				input: prompt,
				store: true,
			})*/

			return response
		} catch (error: unknown) {
			console.log('Error in OpenAIService => generateText.', error)
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
