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
			session: {
				name: 'session',
				secret: enVariables.jwtSecret,
				lifeDurationInMs: 1000 * 60 * 60 * 24 * 30, // 30 days
			},
			redis: {
				url: enVariables.redisUrl,
				sessionsFolder: 'sessions',
			},
			yooKassa: {
				rootUrl: 'https://api.yookassa.ru/v3/',
				shopId: enVariables.yooKassa.shopId,
				secretKey: enVariables.yooKassa.secretKey,
			},
			openAI: {
				apiKey: enVariables.openAi.apiKey,
			},
			oauth: {
				github: {
					clientId: enVariables.oauth.github.clientId,
					redirectUrl: enVariables.oauth.github.redirectUrl,
					clientSecret: enVariables.oauth.github.clientSecret,
				},
				google: {
					clientId: enVariables.oauth.google.clientId,
					redirectUrl: enVariables.oauth.google.redirectUrl,
					clientSecret: enVariables.oauth.google.clientSecret,
				},
				yandex: {
					clientId: enVariables.oauth.yandex.clientId,
					redirectUrl: enVariables.oauth.yandex.redirectUrl,
					clientSecret: enVariables.oauth.yandex.clientSecret,
				},
			},
			welcomeBonusInRub: parseInt(enVariables.welcomeBonusInRub),
			// Стоимость одного токена в долларах
			providerTokenPriceInRub: {
				openAi: {
					nano: {
						input: (100 * 0.05) / 1_000_000, // 100 рублей за доллар * количество долларов / количество токенов
						output: (100 * 0.4) / 1_000_000,
					},
					mini: {
						input: (100 * 0.25) / 1_000_000,
						output: (100 * 2) / 1_000_000,
					},
					standard: {
						input: (100 * 1.25) / 1_000_000,
						output: (100 * 10) / 1_000_000,
					},
				},
			},
			// Моя наценка к стоимости одного токена
			myPriceMultiplier: 2.3,
			yandexCloud: {
				s3: {
					keyId: enVariables.yandexCloud.s3.keyId,
					secretKey: enVariables.yandexCloud.s3.secretKey,
					bucketName: 'explain',
				},
			},
		}
	}

	getEnVariables() {
		return {
			mode: this.configService.get<
				'localtest' | 'localdev' | 'localcheckserver' | 'serverdevelop' | 'servermaster'
			>('MODE'),
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
			jwtSecret: this.configService.get<string>('JWT_SECRET') as string,
			redisUrl: this.configService.get<string>('REDIS_URL') as string,
			yooKassa: {
				shopId: this.configService.get<string>('YOOKASSA_SHOP_ID') as string,
				secretKey: this.configService.get<string>('YOOKASSA_SECRET_KEY') as string,
			},
			openAi: {
				apiKey: this.configService.get<string>('OPENAI_API_KEY') as string,
			},
			oauth: {
				github: {
					clientId: this.configService.get<string>('NEXT_PUBLIC_OAUTH_GITHUB_CLIENT_ID'),
					redirectUrl: this.configService.get<string>('NEXT_PUBLIC_OAUTH_GITHUB_REDIRECT_URL'),
					clientSecret: this.configService.get<string>('OAUTH_GITHUB_CLIENT_SECRET'),
				},
				google: {
					clientId: this.configService.get<string>('NEXT_PUBLIC_OAUTH_GOOGLE_CLIENT_ID'),
					redirectUrl: this.configService.get<string>('NEXT_PUBLIC_OAUTH_GOOGLE_REDIRECT_URL'),
					clientSecret: this.configService.get<string>('OAUTH_GOOGLE_CLIENT_SECRET'),
				},
				yandex: {
					clientId: this.configService.get<string>('NEXT_PUBLIC_OAUTH_YANDEX_CLIENT_ID'),
					redirectUrl: this.configService.get<string>('NEXT_PUBLIC_OAUTH_YANDEX_REDIRECT_URL'),
					clientSecret: this.configService.get<string>('OAUTH_YANDEX_CLIENT_SECRET'),
				},
			},
			// User gets this amount on balance if he confirms his personality with OAuth
			welcomeBonusInRub: this.configService.get<string>('WELCOME_BONUS') as string,
			yandexCloud: {
				s3: {
					keyId: this.configService.get<string>('YANDEX_CLOUD_S3_KEY_ID') as string,
					secretKey: this.configService.get<string>('YANDEX_CLOUD_S3_SECRET_KEY') as string,
				},
			},
		}
	}
}
