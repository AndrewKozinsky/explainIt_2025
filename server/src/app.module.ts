import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { EmailAdapterModule } from './infrastructure/emailAdapter/email-adapter.module'
import { GigaChatModule } from './infrastructure/gigaChat/gigaChat.module'
import { HashAdapterModule } from './infrastructure/hashAdapter/hash-adapter.module'
import { MainConfigModule } from './infrastructure/mainConfig/mainConfig.module'
import { MainConfigService } from './infrastructure/mainConfig/mainConfig.service'
import { join } from 'path'
import { OpenAIModule } from './infrastructure/openAI/openAI.module'
import { RedisModule } from './infrastructure/redis/redis.module'
import { YooKassaModule } from './infrastructure/yooKassa/yooKassa.module'
import { AiModule } from './routes/ai/ai.module'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { TelegramModule } from './infrastructure/telegram/telegram.module'
import { AuthModule } from './routes/auth/auth.module'
import { BookModule } from './routes/book/book.module'
import { BookChapterModule } from './routes/bookChapter/bookChapter.module'
import { DbModule } from './routes/db/db.module'
import { Request, Response } from 'express'
import { PaymentModule } from './routes/payment/payment.module'
import { WebhookModule } from './routes/webhook/webhook.module'

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
		HashAdapterModule,
		MainConfigModule,
		AiModule,
		EmailAdapterModule,
		AuthModule,
		TelegramModule,
		GigaChatModule,
		OpenAIModule,
		DbModule,
		RedisModule,
		PaymentModule,
		YooKassaModule,
		WebhookModule,
		BookModule,
		BookChapterModule,
	],
	providers: [],
})
export class AppModule {}
