import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { VideoPrivateQueryRepository } from 'repo/video/videoPrivate.queryRepository'
import { VideoPrivateRepository } from 'repo/video/videoPrivate.repository'
import { PrismaService } from 'db/prisma.service'
import { ChargeSubtitlesGenerationHandler } from 'features/video/subtitlesGeneration/ChargeSubtitlesGeneration.command'
import { SubtitlesGenerationProcessor } from 'features/video/subtitlesGeneration/SubtitlesGeneration.processor'
import { UpdatePrivateVideoHandler } from 'features/video/UpdatePrivateVideo.command'
import { CloudRuS3Module } from 'infrastructure/cloudRuS3/cloudRuS3.module'
import { DeepgramSttModule } from 'infrastructure/deepgramStt/deepgramStt.module'
import { MainConfigModule } from 'infrastructure/mainConfig/mainConfig.module'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { buildBullmqConnection } from 'infrastructure/queues/bullmq.connection'
import { QueueNames } from 'infrastructure/queues/queueNames'

/**
 * Worker-side Nest app. Runs in a separate process (main.worker.ts).
 *
 * Wires exactly what the subtitles generation processor needs:
 *   - Shared BullMQ connection + queue registration
 *   - CQRS + reused handlers (UpdatePrivateVideoCommand for SRT persistence,
 *     ChargeSubtitlesGenerationCommand for balance write-off)
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
		CloudRuS3Module,
		DeepgramSttModule,
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
		VideoPrivateRepository,
		VideoPrivateQueryRepository,
		UniversalPhraseQueryRepository,
		SubtitleRepository,
		SentenceRepository,
		SubtitleSentenceInitRepository,
		UserBalanceTransactionRepository,
		UpdatePrivateVideoHandler,
		ChargeSubtitlesGenerationHandler,
		SubtitlesGenerationProcessor,
	],
})
export class WorkerModule {}
