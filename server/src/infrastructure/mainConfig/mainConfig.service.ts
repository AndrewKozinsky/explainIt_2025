import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MainConfigService {
	constructor(private configService: ConfigService) {}

	get() {
		const enVariables = this.getEnVariables()

		for (let val of Object.values(enVariables)) {
			if (!val) throw new Error('Env variable is empty!')
		}

		return {
			mode: enVariables.mode,
			port: enVariables.port,
			gigaChatClientId: enVariables.gigaChatClientId,
			gigaChatClientSecret: enVariables.gigaChatClientSecret,
			gigaChatAuthorizationKey: enVariables.gigaChatAuthorizationKey,
			telegramFromExplainBotToken: enVariables.telegramFromExplainBotToken,
			telegramFromExplainBotChatId: enVariables.telegramFromExplainBotChatId,
		}
	}

	getEnVariables() {
		return {
			mode: this.configService.get<string>('MODE') as 'test' | 'dev' | 'server',
			port: this.configService.get<number>('PORT') || 3001,
			gigaChatClientId: this.configService.get<string>('GIGA_CHAT_CLIENT_ID') || '',
			gigaChatClientSecret: this.configService.get<string>('GIGA_CHAT_CLIENT_SECRET') || '',
			gigaChatAuthorizationKey: this.configService.get<string>('GIGA_CHAT_AUTHORIZATION_KEY') || '',
			telegramFromExplainBotToken: this.configService.get<string>('TELEGRAM_FROM_EXPLAIN_BOT_TOKEN') || '',
			telegramFromExplainBotChatId: this.configService.get<number>('TELEGRAM_FROM_EXPLAIN_BOT_CHAT_ID') || 0,
		}
	}
}
