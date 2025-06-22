import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MainConfigService {
	constructor(private configService: ConfigService) {}

	get() {
		const enVariables = this.getEnVariables()

		for (let key in enVariables) {
			// @ts-ignore
			if (!enVariables[key]) throw new Error(`Env variable ${key} is empty!`)
		}

		return {
			mode: enVariables.mode,
			port: enVariables.port,
			gigaChatClientId: enVariables.gigaChatClientId,
			gigaChatClientSecret: enVariables.gigaChatClientSecret,
			gigaChatAuthorizationKey: enVariables.gigaChatAuthorizationKey,
			telegramFromExplainBotToken: enVariables.telegramFromExplainBotToken,
			telegramFromExplainBotChatId: enVariables.telegramFromExplainBotChatId,
			site: {
				name: 'ExplainIt',
				domainRoot: enVariables.siteDomainRoot,
				domainRootWithProtocol: enVariables.siteDomainRootWithProtocol,
			},
			emailAdapter: {
				userId: enVariables.emailAdapterUserId,
				secret: enVariables.emailAdapterSecret,
				fromName: 'Andrew Kozinsky',
				fromEmail: 'mail@andrewkozinsky.ru',
			},
		}
	}

	getEnVariables() {
		return {
			mode: this.configService.get<'localtest' | 'localdev' | 'localcheckserver' | 'serverdevelop' | 'servermaster'>('MODE'),
			port: this.configService.get<number>('PORT') || 3001,
			gigaChatClientId: this.configService.get<string>('GIGA_CHAT_CLIENT_ID') || '',
			gigaChatClientSecret: this.configService.get<string>('GIGA_CHAT_CLIENT_SECRET') || '',
			gigaChatAuthorizationKey: this.configService.get<string>('GIGA_CHAT_AUTHORIZATION_KEY') || '',
			telegramFromExplainBotToken: this.configService.get<string>('TELEGRAM_FROM_EXPLAIN_BOT_TOKEN') || '',
			telegramFromExplainBotChatId: this.configService.get<number>('TELEGRAM_FROM_EXPLAIN_BOT_CHAT_ID') || 0,
			siteDomainRoot: this.configService.get<string>('SITE_DOMAIN_ROOT') as string,
			siteDomainRootWithProtocol: this.configService.get<string>('SITE_DOMAIN_ROOT_WITH_PROTOCOL') as string,
			emailAdapterUserId: this.configService.get<string>('EMAIL_ADAPTER_USER_ID') as string,
			emailAdapterSecret: this.configService.get<string>('EMAIL_ADAPTER_SECRET') as string,
		}
	}
}
