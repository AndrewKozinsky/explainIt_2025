import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { llmTokenPrice } from './llmTokenPrice'

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
			region: enVariables.region,
			mode: enVariables.mode,
			port: enVariables.port,
			// gigaChatClientId: enVariables.gigaChatClientId,
			// gigaChatClientSecret: enVariables.gigaChatClientSecret,
			// gigaChatAuthorizationKey: enVariables.gigaChatAuthorizationKey,
			telegramFromExplainBotToken: enVariables.telegramFromExplainBotToken,
			telegramFromExplainBotChatId: enVariables.telegramFromExplainBotChatId,
			get site() {
				if (enVariables.region === 'ru') {
					return {
						name: 'ExplainIt',
						// Основной домен. В отличие от domainRoot не зависит от режима запуска (localhost, dev.*)
						domain: 'explainit.ru',
						domainRoot: enVariables.siteRuDomainRoot,
						domainRootWithProtocol: enVariables.siteRuDomainRootWithProtocol,
					}
				} else {
					return {
						name: 'Immersia',
						// Основной домен. В отличие от domainRoot не зависит от режима запуска (localhost, dev.*)
						domain: 'immersia.site',
						domainRoot: enVariables.siteIntlDomainRoot,
						domainRootWithProtocol: enVariables.siteIntlDomainRootWithProtocol,
					}
				}
			},
			get emailAdapter() {
				// Письма уходят с основного домена региона во всех режимах (включая dev и локальный запуск):
				// отправлять можно только с домена, подтверждённого в Resend.
				return {
					resendApiKey: enVariables.resendApiKey,
					fromName: this.site.name,
					fromEmail: `noreply@${this.site.domain}`,
				}
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
				// Цены за 1M токенов, стандартный тариф (https://developers.openai.com/api/docs/pricing, ноябрь 2026)
				llmPriceInDollars: {
					nano: llmTokenPrice({ input: 0.1, cachedInput: 0.01, output: 0.5 }), // gpt-6-luna
					mini: llmTokenPrice({ input: 1, cachedInput: 0.05, output: 5 }), // gpt-6.1-terra
					standard: llmTokenPrice({ input: 2, cachedInput: 0.1, output: 10 }), // gpt-6.1-sol
				},
				// Модели изображений gpt-image-2.6 (flare и sunburst стоят одинаково), за 1M токенов
				imagePriceInDollars: {
					textInputPerMillionTokens: 5,
					imageInputPerMillionTokens: 8,
					imageOutputPerMillionTokens: 30,
				},
				// gpt-4o-mini-tts: текст на входе $0.60 и аудио на выходе $12 за 1M токенов.
				// API озвучки не возвращает число токенов, поэтому аудио считается по длительности:
				// OpenAI оценивает минуту озвучки в $0.015 (1250 аудиотокенов).
				ttsPriceInDollars: {
					textInputPerMillionTokens: 0.6,
					audioOutputPerMinute: 0.015,
				},
			},
			soniox: {
				apiKey: enVariables.soniox.apiKey,
				// https://soniox.com/pricing, ноябрь 2026
				priceInDollars: {
					// Распознавание речи в реальном времени: около $0.12 за час аудио
					realtimeSpeechToTextPerMinute: 0.12 / 60,
				},
			},
			blackForestLabs: {
				apiKey: enVariables.blackForestLabs.apiKey,
				// FLUX 3 Image, цена за картинку по ярусу размера (https://bfl.ai/pricing, ноябрь 2026).
				// Референсные изображения не оплачиваются отдельно.
				flux3ImagePriceInDollars: [
					{ maxMegapixels: 0.6, pricePerImage: 0.041 },
					{ maxMegapixels: 1, pricePerImage: 0.048 },
					{ maxMegapixels: 2, pricePerImage: 0.07 },
					{ maxMegapixels: 4, pricePerImage: 0.1 },
					{ maxMegapixels: 16, pricePerImage: 0.607 },
				],
			},
			deepSeek: {
				apiKey: enVariables.deepSeek.apiKey,
				// https://api-docs.deepseek.com/quick_start/pricing, ноябрь 2026.
				// Вне пиковых часов цены вдвое ниже, но время запроса не учитывается: берётся пиковая (полная) цена.
				llmPriceInDollars: {
					flash: llmTokenPrice({ input: 0.3, cachedInput: 0.006, output: 1.2 }), // deepseek-flash
					pro: llmTokenPrice({ input: 1.32, cachedInput: 0.044, output: 3.96 }), // deepseek-v4-pro
				},
			},
			mimo: {
				apiKey: enVariables.mimo.apiKey,
				baseUrl: 'https://api.xiaomimimo.com/v1',
				// Цены первого лица по данным агрегаторов (официальная страница цен не читается без JS), ноябрь 2026
				llmPriceInDollars: {
					flash: llmTokenPrice({ input: 0.14, cachedInput: 0.0028, output: 0.28 }), // mimo-v2.6-flash
					pro: llmTokenPrice({ input: 0.435, cachedInput: 0.0036, output: 0.87 }), // mimo-v2.6-pro
				},
			},
			zai: {
				apiKey: enVariables.zai.apiKey,
				baseUrl: 'https://api.z.ai/api/paas/v4',
				// https://docs.z.ai/guides/overview/pricing, ноябрь 2026
				llmPriceInDollars: {
					flash: llmTokenPrice({ input: 0.15, cachedInput: 0.03, output: 0.5 }), // glm-5.3-flash
					pro: llmTokenPrice({ input: 1.4, cachedInput: 0.26, output: 4.4 }), // glm-5.3
				},
			},
			gemini: {
				// https://aistudio.google.com/docs/pricing, ноябрь 2026, тариф для запросов до 200k токенов.
				// Алиасы *-latest не называют конкретную модель: цены взяты по самым новым моделям семейства,
				// для акционных цен — полная цена после окончания акции.
				llmPriceInDollars: {
					flashLite: llmTokenPrice({ input: 0.3, cachedInput: 0.03, output: 2.5 }), // gemini-3.5-flash-lite
					flash: llmTokenPrice({ input: 1.5, cachedInput: 0.15, output: 7.5 }), // gemini-3.6-flash
					pro: llmTokenPrice({ input: 2, cachedInput: 0.2, output: 12 }), // gemini-3.1-pro-preview
				},
			},
			deepgram: {
				apiKey: enVariables.deepgram.apiKey,
				// Nova-3 для записанного аудио, pay-as-you-go (https://deepgram.com/pricing, ноябрь 2026)
				priceInDollars: {
					prerecordedSpeechToTextPerMinute: 0.0043,
				},
			},
			generateSubtitles: {
				// Максимальная допустимая длительность видео для генерации субтитров (в секундах).
				maxVideoSeconds: 60 * 60 * 2,
				// Каталог для временных файлов аудио/видео при обработке.
				tmpDir: '/tmp/subs',
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
			cloudflareR2: {
				s3: {
					accountId: enVariables.cloudflareR2.s3.accountId,
					accessKeyId: enVariables.cloudflareR2.s3.accessKeyId,
					secretAccessKey: enVariables.cloudflareR2.s3.secretAccessKey,
					bucketName: enVariables.cloudflareR2.s3.bucketName,
				},
			},
			// Python container with NLP service
			nlp: {
				containerUrl: `http://explainnlp${enVariables.mode}:8000`,
			},
			billing: {
				// Баланс, который пользователь без тарифа получает каждый день (и при регистрации).
				// Позже переедет в тарифы. Подробности — documentation/topics/billing.md
				freeDailyBalanceInDollars: 0.1,
			},
			googleTts: {
				serviceAccountCredentials: JSON.parse(
					Buffer.from(enVariables.googleTts.serviceAccountJson, 'base64').toString('utf-8'),
				),
			},
			youTube: {
				apiKey: enVariables.youTube.apiKey,
			},
			// Продуктовая аналитика. Токен публичный; null — PostHog не настроен
			posthog: {
				projectToken: enVariables.posthog.projectToken,
			},
		}
	}

	getEnVariables() {
		return {
			region: this.configService.get<'intl' | 'ru'>('REGION'),
			mode: this.configService.get<
				'localtest' | 'localdev' | 'localcheckserver' | 'serverdevelop' | 'servermaster'
			>('MODE'),
			port: this.configService.get<number>('PORT') || 3001,
			// gigaChatClientId: this.configService.get<string>('GIGA_CHAT_CLIENT_ID') || '',
			// gigaChatClientSecret: this.configService.get<string>('GIGA_CHAT_CLIENT_SECRET') || '',
			// gigaChatAuthorizationKey: this.configService.get<string>('GIGA_CHAT_AUTHORIZATION_KEY') || '',
			telegramFromExplainBotToken: this.configService.get<string>('TELEGRAM_FROM_EXPLAIN_BOT_TOKEN') || '',
			telegramFromExplainBotChatId: this.configService.get<number>('TELEGRAM_FROM_EXPLAIN_BOT_CHAT_ID') || 0,
			siteRuDomainRoot: this.configService.get<string>('SITE_RU_DOMAIN_ROOT') as string,
			siteRuDomainRootWithProtocol: this.configService.get<string>('SITE_RU_DOMAIN_ROOT_WITH_PROTOCOL') as string,
			siteIntlDomainRoot: this.configService.get<string>('SITE_INTL_DOMAIN_ROOT') as string,
			siteIntlDomainRootWithProtocol: this.configService.get<string>(
				'SITE_INTL_DOMAIN_ROOT_WITH_PROTOCOL',
			) as string,
			resendApiKey: this.configService.get<string>('RESEND_API_KEY') as string,
			jwtSecret: this.configService.get<string>('JWT_SECRET') as string,
			redisUrl: this.configService.get<string>('REDIS_URL') as string,
			yooKassa: {
				shopId: this.configService.get<string>('YOOKASSA_SHOP_ID') as string,
				secretKey: this.configService.get<string>('YOOKASSA_SECRET_KEY') as string,
			},
			openAi: {
				apiKey: this.configService.get<string>('OPENAI_API_KEY') as string,
			},
			soniox: {
				apiKey: this.configService.get<string>('SONIOX_API_KEY')?.trim() || null,
			},
			blackForestLabs: {
				apiKey: this.configService.get<string>('BLACK_FOREST_LABS_API_KEY')?.trim() || null,
			},
			deepSeek: {
				apiKey: this.configService.get<string>('DEEPSEEK_API_KEY') as string,
			},
			zai: {
				apiKey: this.configService.get<string>('ZAI_API_KEY') as string,
			},
			mimo: {
				apiKey: this.configService.get<string>('MIMO_API_KEY') as string,
			},
			deepgram: {
				apiKey: this.configService.get<string>('DEEPGRAM_API_KEY') as string,
			},
			posthog: {
				projectToken: this.configService.get<string>('POSTHOG_KEY')?.trim() || null,
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
			cloudflareR2: {
				s3: {
					accountId: this.configService.get<string>('CLOUDFLARE_S3_ACCOUNT_ID') as string,
					accessKeyId: this.configService.get<string>('CLOUDFLARE_S3_ACCESS_KEY_ID') as string,
					secretAccessKey: this.configService.get<string>('CLOUDFLARE_S3_SECRET_ACCESS_KEY') as string,
					bucketName: this.configService.get<string>('CLOUDFLARE_S3_BUCKET_NAME') as string,
				},
			},
			googleTts: {
				serviceAccountJson: this.configService.get<string>('GOOGLE_AI_SERVICE_ACCOUNT_JSON') as string,
			},
			youTube: {
				apiKey: this.configService.get<string>('YOUTUBE_API_KEY') as string,
			},
		}
	}
}
