import { join } from 'path'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { GraphQLModule } from '@nestjs/graphql'
import { ScheduleModule } from '@nestjs/schedule'
import { Request, Response } from 'express'
import { WinstonModule } from 'nest-winston'
import { AudioPronunciationModule } from 'routes/audioPronunciation/audioPronunciation.module'
import { AuthModule } from 'routes/auth/auth.module'
import { BookChapterModule } from 'routes/bookChapter/bookChapter.module'
import { BookModule } from 'routes/bookPrivate/book.module'
import { BookPublicModule } from 'routes/bookPublic/bookPublic.module'
import { DbModule } from 'routes/db/db.module'
import { FlashcardModule } from 'routes/flashcard/flashcard.module'
import { GrammarConceptModule } from 'routes/grammarConcept/grammarConcept.module'
import { LanguageModule } from 'routes/language/language.module'
import { PaymentModule } from 'routes/payment/payment.module'
import { SentenceChatModule } from 'routes/sentenceChat/sentenceChat.module'
import { TranslateRouteModule } from 'routes/translate/translate.module'
import { UniversalPhraseModule } from 'routes/universalPhrase/universalPhrase.module'
import { UniversalTranscriptionModule } from 'routes/universalTranscription/universalTranscription.module'
import { VideoPrivateModule } from 'routes/videoPrivate/videoPrivate.module'
import { VideoPublicModule } from 'routes/videoPublic/videoPublic.module'
import { WebhookModule } from 'routes/webhook/webhook.module'
import { CloudRuS3Module } from 'infrastructure/cloudRuS3/cloudRuS3.module'
import { DeepgramSttModule } from 'infrastructure/deepgramStt/deepgramStt.module'
import { DeepSeekModule } from 'infrastructure/deepSeek/deepSeek.module'
import { EmailAdapterModule } from 'infrastructure/emailAdapter/email-adapter.module'
import { GlobalExceptionFilter } from 'infrastructure/exceptions/global-exception.filter'
import { GigaChatModule } from 'infrastructure/gigaChat/gigaChat.module'
import { GoogleGeminiModule } from 'infrastructure/googleGemini/googleGemini.module'
import { GoogleTtsModule } from 'infrastructure/googleTts/googleTts.module'
import { HashAdapterModule } from 'infrastructure/hashAdapter/hash-adapter.module'
import { winstonUseFactory } from 'infrastructure/logger/winstonUseFactory'
import { MainConfigModule } from 'infrastructure/mainConfig/mainConfig.module'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { OpenAIModule } from 'infrastructure/openAI/openAI.module'
import { QueuesModule } from 'infrastructure/queues/queues.module'
import { RedisModule } from 'infrastructure/redis/redis.module'
import { StartServerTasksRunner } from 'infrastructure/StartServerTasksRunner'
import { TelegramModule } from 'infrastructure/telegram/telegram.module'
import { YandexCloudS3Module } from 'infrastructure/yandexCloudS3/yandexCloudS3.module'
import { YandexDictionaryModule } from 'infrastructure/yandexDictionary/yandexDictionary.module'
import { YandexTranslateModule } from 'infrastructure/yandexTranslate/yandexTranslate.module'
import { YooKassaModule } from 'infrastructure/yooKassa/yooKassa.module'

@Module({
	imports: [
		ScheduleModule.forRoot(),
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
		WinstonModule.forRootAsync({
			imports: [MainConfigModule],
			useFactory: (mainConfigService: MainConfigService) => {
				return winstonUseFactory(mainConfigService)
			},
			inject: [MainConfigService],
		}),
		CqrsModule,
		HashAdapterModule,
		MainConfigModule,
		EmailAdapterModule,
		AuthModule,
		TelegramModule,
		GigaChatModule,
		OpenAIModule,
		DeepSeekModule,
		DeepgramSttModule,
		GoogleGeminiModule,
		GoogleTtsModule,
		CloudRuS3Module,
		YandexCloudS3Module,
		YandexDictionaryModule,
		YandexTranslateModule,
		DbModule,
		RedisModule,
		QueuesModule,
		PaymentModule,
		YooKassaModule,
		WebhookModule,
		BookModule,
		BookPublicModule,
		BookChapterModule,
		VideoPrivateModule,
		VideoPublicModule,
		TranslateRouteModule,
		SentenceChatModule,
		UniversalPhraseModule,
		UniversalTranscriptionModule,
		AudioPronunciationModule,
		LanguageModule,
		FlashcardModule,
		GrammarConceptModule,
	],
	providers: [StartServerTasksRunner, { provide: APP_FILTER, useClass: GlobalExceptionFilter }],
})
export class AppModule {}
