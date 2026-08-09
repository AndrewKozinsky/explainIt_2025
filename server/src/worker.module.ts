import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase/universalPhrase.queryRepository'
import { VideoQueryRepository } from 'repo/video/video.queryRepository'
import { VideoRepository } from 'repo/video/video.repository'
import { PrismaService } from 'db/prisma.service'
import { S3SubtitlesStrategy } from 'features/video/subtitlesGeneration/strategies/S3SubtitlesStrategy'
import { YoutubeSubtitlesStrategy } from 'features/video/subtitlesGeneration/strategies/YoutubeSubtitlesStrategy'
import { SubtitlesGenerationProcessor } from 'features/video/subtitlesGeneration/SubtitlesGeneration.processor'
import { UpdateVideoHandler } from 'features/video/UpdateVideo.command'
import { CloudRuS3Module } from 'infrastructure/cloudRuS3/cloudRuS3.module'
import { DeepgramSttModule } from 'infrastructure/deepgramStt/deepgramStt.module'
import { DeepSeekModule } from 'infrastructure/deepSeek/deepSeek.module'
import { GoogleGeminiModule } from 'infrastructure/googleGemini/googleGemini.module'
import { LlmProviderModule } from 'infrastructure/llmProviderAdapter/llmProvider.module'
import { MainConfigModule } from 'infrastructure/mainConfig/mainConfig.module'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { OpenAIModule } from 'infrastructure/openAI/openAI.module'
import { buildBullmqConnection } from 'infrastructure/queues/bullmq.connection'
import { QueueNames } from 'infrastructure/queues/queueNames'
import { SubtitlesModule } from 'infrastructure/subtitles/subtitles.module'
import { YoutubeService } from 'infrastructure/youtube/youtube.service'

/**
 * Worker-side Nest app. Runs in a separate process (main.worker.ts).
 *
 * Wires exactly what the subtitles generation processor needs:
 *   - Shared BullMQ connection + queue registration
 *   - CQRS + reused handlers (UpdateVideoCommand for SRT persistence)
 *   - Prisma + all repos those handlers touch
 *   - CloudRuS3 (S3 download) + Deepgram STT (ASR)
 *
 * AppModule is intentionally NOT imported: GraphQL/Express/Apollo would try
 * to boot an HTTP server on start, which the worker doesn't need.
 */
@Module({
	imports: [
		CqrsModule,
		MainConfigModule,
		DeepSeekModule,
		GoogleGeminiModule,
		OpenAIModule,
		LlmProviderModule,
		CloudRuS3Module,
		DeepgramSttModule,
		SubtitlesModule,
		BullModule.forRootAsync({
			imports: [MainConfigModule],
			inject: [MainConfigService],
			useFactory: (mainConfig: MainConfigService) => ({
				connection: buildBullmqConnection(mainConfig),
			}),
		}),
		BullModule.registerQueue({ name: QueueNames.SUBTITLES_GENERATION }),
	],
	providers: [
		PrismaService,
		DBRepository,
		VideoRepository,
		VideoQueryRepository,
		UniversalPhraseQueryRepository,
		SubtitleRepository,
		SentenceRepository,
		SubtitleSentenceInitRepository,
		UpdateVideoHandler,
		YoutubeService,
		S3SubtitlesStrategy,
		YoutubeSubtitlesStrategy,
		SubtitlesGenerationProcessor,
	],
})
export class WorkerModule {}
