import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { ScheduleModule } from '@nestjs/schedule'
// import { Request, Response } from 'express'
import { AiDialogueScenarioModule } from 'routes/aiDialogueScenario/aiDialogueScenario.module'
import { AuthModule } from 'routes/auth/auth.module'
import { BookModule } from 'routes/book/book.module'
import { BookChapterModule } from 'routes/bookChapter/bookChapter.module'
import { DbModule } from 'routes/db/db.module'
import { LanguageModule } from 'routes/language/language.module'
import { PaymentModule } from 'routes/payment/payment.module'
import { SentenceChatModule } from 'routes/sentenceChat/sentenceChat.module'
import { TranslateRouteModule } from 'routes/translate/translate.module'
import { UniversalPhraseModule } from 'routes/universalPhrase/universalPhrase.module'
import { UniversalPhraseAudioModule } from 'routes/universalPhraseAudio/universalPhraseAudio.module'
import { UniversalPhraseTranscriptionModule } from 'routes/universalPhraseTranscription/universalPhraseTranscription.module'
import { UniversalPhraseTranslationModule } from 'routes/universalPhraseTranslation/universalPhraseTranslation.module'
import { VideoModule } from 'routes/video/video.module'
import { WebhookModule } from 'routes/webhook/webhook.module'
import { YoutubeRouteModule } from 'routes/youtube/youtube.module'
import { CloudflareS3Module } from 'infrastructure/cloudflareS3/cloudflareS3.module'
import { CloudRuS3Module } from 'infrastructure/cloudRuS3/cloudRuS3.module'
import { DeepgramSttModule } from 'infrastructure/deepgramStt/deepgramStt.module'
import { DeepSeekModule } from 'infrastructure/deepSeek/deepSeek.module'
import { EmailAdapterModule } from 'infrastructure/emailAdapter/email-adapter.module'
import { GlobalExceptionFilter } from 'infrastructure/exceptions/global-exception.filter'
// import { GigaChatModule } from 'infrastructure/gigaChat/gigaChat.module'
import { GoogleGeminiModule } from 'infrastructure/googleGemini/googleGemini.module'
import { GoogleTtsModule } from 'infrastructure/googleTts/googleTts.module'
import { HashAdapterModule } from 'infrastructure/hashAdapter/hash-adapter.module'
import { MainConfigModule } from 'infrastructure/mainConfig/mainConfig.module'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { OpenAIModule } from 'infrastructure/openAI/openAI.module'
import { QueuesModule } from 'infrastructure/queues/queues.module'
import { RedisModule } from 'infrastructure/redis/redis.module'
import { StartServerTasksRunner } from 'infrastructure/StartServerTasksRunner'
import { SubtitlesModule } from 'infrastructure/subtitles/subtitles.module'
import { TelegramModule } from 'infrastructure/telegram/telegram.module'
import { YandexCloudS3Module } from 'infrastructure/yandexCloudS3/yandexCloudS3.module'
// import { YandexDictionaryModule } from 'infrastructure/yandexDictionary/yandexDictionary.module'
// import { YandexTranslateModule } from 'infrastructure/yandexTranslate/yandexTranslate.module'
import { YooKassaModule } from 'infrastructure/yooKassa/yooKassa.module'
import { YoutubeModule } from 'infrastructure/youtube/youtube.module'
import { ZaiModule } from 'infrastructure/zai/zai.module'

@Module({
	imports: [
		ScheduleModule.forRoot(),
		CqrsModule,
		HashAdapterModule,
		MainConfigModule,
		EmailAdapterModule,
		AuthModule,
		TelegramModule,
		// GigaChatModule,
		OpenAIModule,
		DeepSeekModule,
		ZaiModule,
		DeepgramSttModule,
		SubtitlesModule,
		GoogleGeminiModule,
		GoogleTtsModule,
		CloudRuS3Module,
		CloudflareS3Module,
		YandexCloudS3Module,
		// YandexDictionaryModule,
		// YandexTranslateModule,
		DbModule,
		RedisModule,
		QueuesModule,
		PaymentModule,
		YooKassaModule,
		WebhookModule,
		AiDialogueScenarioModule,
		BookModule,
		BookChapterModule,
		VideoModule,
		YoutubeModule,
		YoutubeRouteModule,
		TranslateRouteModule,
		SentenceChatModule,
		UniversalPhraseModule,
		UniversalPhraseTranscriptionModule,
		UniversalPhraseTranslationModule,
		UniversalPhraseAudioModule,
		LanguageModule,
	],
	providers: [StartServerTasksRunner, { provide: APP_FILTER, useClass: GlobalExceptionFilter }],
})
export class AppModule {}
