import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

const oneDollarInRub = 110

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
				priceInRub: {
					nano: {
						input: (oneDollarInRub * 0.05) / 1_000_000, // 110 рублей за доллар * количество долларов на вход / количество токенов
						output: (oneDollarInRub * 0.4) / 1_000_000, // 110 рублей за доллар * количество долларов на выход / количество токенов
					},
					mini: {
						input: (oneDollarInRub * 0.25) / 1_000_000,
						output: (oneDollarInRub * 2) / 1_000_000,
					},
					standard: {
						input: (oneDollarInRub * 1.25) / 1_000_000,
						output: (oneDollarInRub * 10) / 1_000_000,
					},
				},
			},
			deepSeek: {
				apiKey: enVariables.deepSeek.apiKey,
				priceInRub: {
					input: (oneDollarInRub * 0.28) / 1_000_000, // 110 рублей за доллар * количество долларов на вход / количество токенов
					output: (oneDollarInRub * 0.42) / 1_000_000, // 110 рублей за доллар * количество долларов на выход / количество токенов
				},
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
			yandexCloud: {
				s3: {
					keyId: enVariables.yandexCloud.s3.keyId,
					secretKey: enVariables.yandexCloud.s3.secretKey,
					bucketName: 'explain',
					bucketUrl: 'https://storage.yandexcloud.net/explain',
				},
				translate: {
					keyId: enVariables.yandexCloud.translate.keyId,
					secretKey: enVariables.yandexCloud.translate.secretKey,
					folderId: enVariables.yandexCloud.translate.folderId,
					priceForSymbolInKopecks: 0.05 * 2.3, // 0.5 рублей за тысячу символов * наценка
				},
				dictionary: {
					key: enVariables.yandexCloud.dictionary.key,
				},
			},
			cloudRu: {
				s3: {
					keyId: enVariables.cloudRu.keyId,
					secretKey: enVariables.cloudRu.secretKey,
					bucketName: 'explain',
					bucketUrl: 'https://s3.cloud.ru/explain',
					tenantId: enVariables.cloudRu.s3.tenantId,
				},
			},
			// Python container with NLP service
			nlp: {
				containerUrl: `http://explainnlp${enVariables.mode}:8000`,
			},
			// Сколько переводов может сделать пользователь в день без тарифа позволяющего переводить любое количество материалов в пределах баланса
			dailyTranslationsLimit: 3,
			// Grafana Loki
			loki: enVariables.loki,
			elevenLabs: enVariables.elevenLabs,
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
			deepSeek: {
				apiKey: this.configService.get<string>('DEEPSEEK_API_KEY') as string,
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
			yandexCloud: {
				s3: {
					keyId: this.configService.get<string>('YANDEX_CLOUD_S3_KEY_ID') as string,
					secretKey: this.configService.get<string>('YANDEX_CLOUD_S3_SECRET_KEY') as string,
				},
				translate: {
					keyId: this.configService.get<string>('YANDEX_CLOUD_TRANSLATE_KEY_ID') as string,
					secretKey: this.configService.get<string>('YANDEX_CLOUD_TRANSLATE_SECRET_KEY') as string,
					folderId: this.configService.get<string>('YANDEX_CLOUD_TRANSLATE_FOLDER_ID') as string,
				},
				dictionary: {
					key: this.configService.get<string>('YANDEX_DICTIONARY_KEY') as string,
				},
			},
			cloudRu: {
				keyId: this.configService.get<string>('CLOUD_RU_KEY_ID') as string,
				secretKey: this.configService.get<string>('CLOUD_RU_SECRET_KEY') as string,
				s3: {
					tenantId: this.configService.get<string>('CLOUD_RU_S3_TENANT_ID') as string,
				},
			},
			loki: {
				url: this.configService.get<string>('LOKI_URL') as string,
				userId: this.configService.get<string>('LOKI_USER_ID') as string,
				apiKey: this.configService.get<string>('LOKI_API_KEY') as string,
			},
			elevenLabs: {
				apiKey: this.configService.get<string>('ELEVEN_LABS_API_KEY') as string,
			},
		}
	}
}
