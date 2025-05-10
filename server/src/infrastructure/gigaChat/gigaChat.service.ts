import { Injectable } from '@nestjs/common'
import * as path from 'path'
import { MainConfigService } from '../mainConfig/mainConfig.service'

process.env.NODE_EXTRA_CA_CERTS = path.resolve(__dirname, './certificates')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export enum GigaChatModel {
	lite = 'GigaChat-2',
	pro = 'GigaChat-2-Pro',
	max = 'GigaChat-2-Max',
}

@Injectable()
export class GigaChatService {
	// Токен доступа действующий 30 минут
	accessToken = ''

	constructor(private mainConfig: MainConfigService) {}

	/**
	 * Отправляет ИИ вопрос на который нужно получить ответ
	 * @param prompt — текст вопроса
	 * @param model — используемая модель ГигаЧата
	 */
	async generateText(prompt: string, model: GigaChatModel = GigaChatModel.lite): Promise<string> {
		if (!prompt) {
			console.log('Error in GigaChatService => generateText. Empty prompt.')
			return ''
		}

		const requestResult: any = await this.makeGenerateTextRequest(prompt, model)

		if (!requestResult) {
			console.log('Error in GigaChatService => generateText')
			return ''
		}

		// Если не авторизован...
		if (requestResult.status === 401) {
			// сделать запрос на обновление токена доступа...
			await this.updateAccessToken()
			// и снова попробовать сделать запрос.
			return this.generateText(prompt)
		}

		try {
			return requestResult.choices[0].message.content
		} catch (err: unknown) {
			console.log(requestResult)
			return ''
		}
	}

	/** Запрос, получающий новый токен доступа и сохраняющий в this.accessToken() */
	private async updateAccessToken() {
		const gigaChatAuthorizationKey = this.mainConfig.get().gigaChatAuthorizationKey

		try {
			return new Promise((resolve, reject) => {
				fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						RqUID: this.mainConfig.get().gigaChatClientId,
						Authorization: 'Basic ' + gigaChatAuthorizationKey,
					},
					body: new URLSearchParams({
						scope: 'GIGACHAT_API_PERS',
					}),
				})
					.then((res) => res.json())
					.then((data) => {
						this.accessToken = data.access_token

						resolve(null)
					})
			})
		} catch (err: unknown) {
			console.log('Error in GigaChatService => updateAccessToken')
			if (err instanceof Error) {
				return err.message
			}

			return null
		}
	}

	/**
	 * Отправляет ИИ вопрос, на который нужно получить ответ.
	 * @param question — текст вопроса
	 * @param model — используемая модель ГигаЧата
	 */
	private async makeGenerateTextRequest(question: string, model: GigaChatModel) {
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
				fetch('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', {
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
			console.log('Error in GigaChatService => makeGenerateTextRequest')

			if (err instanceof Error) {
				return err.message
			}

			return null
		}
	}
}

export interface GigaChatServiceI {
	generateText(prompt: string): Promise<string>
}

@Injectable()
export class GigaChatServiceMock implements GigaChatServiceI {
	constructor() {}

	async generateText(prompt: string): Promise<string> {
		return '{"correct": false, "analysis": "Перевод написан неверно"}'
	}
}
