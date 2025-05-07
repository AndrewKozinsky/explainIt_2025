import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { MainConfigService } from '../mainConfig/mainConfig.service'

@Injectable()
export class TelegramService implements TelegramServiceI {
	constructor(private mainConfig: MainConfigService) {}

	async sendMessageToFromExplainBot(message: string) {
		const botToken = this.mainConfig.get().telegramFromExplainBotToken
		const chatId = this.mainConfig.get().telegramFromExplainBotChatId

		await this.sendMessage(botToken, chatId, message)
	}

	private async sendMessage(botToken: string, chatId: number, message: string) {
		const url = `https://api.telegram.org/bot${botToken}/sendMessage`

		try {
			const response = await axios.post(url, {
				chat_id: chatId,
				text: message,
			})

			return response.data
		} catch (error) {
			console.error(error)
		}
	}
}

export interface TelegramServiceI {
	sendMessageToFromExplainBot(message: string): Promise<void>
}

@Injectable()
export class TelegramServiceMock implements TelegramServiceI {
	constructor() {}

	async sendMessageToFromExplainBot(message: string) {}
}
