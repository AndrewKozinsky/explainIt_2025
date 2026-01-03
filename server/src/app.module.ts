import { join } from 'path'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { GraphQLModule } from '@nestjs/graphql'
import { Request, Response } from 'express'
import { BookPublicModule } from 'routes/bookPublic/bookPublic.module'
import { VideoPrivateModule } from 'routes/videoPrivate/videoPrivate.module'
import { StartServerTasksRunner } from 'infrastructure/StartServerTasksRunner'
import { YandexCloudS3Module } from 'infrastructure/yandexCloudS3/yandexCloudS3.module'
import { YandexTranslateModule } from 'infrastructure/yandexTranslate/yandexTranslate.module'
import { EmailAdapterModule } from './infrastructure/emailAdapter/email-adapter.module'
import { GigaChatModule } from './infrastructure/gigaChat/gigaChat.module'
import { HashAdapterModule } from './infrastructure/hashAdapter/hash-adapter.module'
import { MainConfigModule } from './infrastructure/mainConfig/mainConfig.module'
import { MainConfigService } from './infrastructure/mainConfig/mainConfig.service'
import { OpenAIModule } from './infrastructure/openAI/openAI.module'
import { RedisModule } from './infrastructure/redis/redis.module'
import { TelegramModule } from './infrastructure/telegram/telegram.module'
import { YooKassaModule } from './infrastructure/yooKassa/yooKassa.module'
import { AiModule } from './routes/ai/ai.module'
import { AuthModule } from './routes/auth/auth.module'
import { BookChapterModule } from './routes/bookChapter/bookChapter.module'
import { BookModule } from './routes/bookPrivate/book.module'
import { DbModule } from './routes/db/db.module'
import { PaymentModule } from './routes/payment/payment.module'
import { WebhookModule } from './routes/webhook/webhook.module'
import { YandexTranslateRouteModule } from './routes/yandexTranslate/yandexTranslate.module'

@Module({
	imports: [
		GraphQLModule.forRootAsync<ApolloDriverConfig>({
			driver: ApolloDriver,
			imports: [MainConfigModule],
			useFactory: (mainConfigService: MainConfigService) => {
				return {
					definitions: {
						path: join(process.cwd(), 'src/graphql.ts'),
					},
					autoSchemaFile: true,
					context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }), // <-- Important for accessing session and response
					// graphiql: mainConfigService.get().mode === 'localDev',
					playground: false,
					plugins: [ApolloServerPluginLandingPageLocalDefault()],
					cors: {
						origin: true, // Allow requests from the same origin (handled by Nginx)
						credentials: true, // Enable cookies
					},
				}
			},
			inject: [MainConfigService],
		}),
		CqrsModule,
		HashAdapterModule,
		MainConfigModule,
		AiModule,
		EmailAdapterModule,
		AuthModule,
		TelegramModule,
		GigaChatModule,
		OpenAIModule,
		YandexCloudS3Module,
		YandexTranslateModule,
		DbModule,
		RedisModule,
		PaymentModule,
		YooKassaModule,
		WebhookModule,
		BookModule,
		BookPublicModule,
		BookChapterModule,
		VideoPrivateModule,
		YandexTranslateRouteModule,
	],
	providers: [StartServerTasksRunner],
})
export class AppModule {}
