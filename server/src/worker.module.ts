import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { VideoPrivateRepository } from 'repo/video/videoPrivate.repository'
import { PrismaService } from 'db/prisma.service'
import { SubtitlesGenerationProcessor } from 'features/video/subtitlesGeneration/SubtitlesGeneration.processor'
import { CloudRuS3Module } from 'infrastructure/cloudRuS3/cloudRuS3.module'
import { MainConfigModule } from 'infrastructure/mainConfig/mainConfig.module'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { buildBullmqConnection } from 'infrastructure/queues/bullmq.connection'
import { QueueNames } from 'infrastructure/queues/queueNames'

/**
 * Worker-side Nest app. Runs in a separate process (main.worker.ts) and only
 * wires the minimum set of providers needed by background processors:
 *   - shared BullMQ connection
 *   - the subtitles-generation queue + its @Processor
 *   - Prisma + VideoPrivateRepository (for DB status transitions)
 *   - MainConfig + CloudRuS3 (repo dependency; future ASR pipeline in chunk C)
 *
 * It intentionally does NOT import AppModule: GraphQL/Express would try to
 * boot an HTTP server on start, which we don't want in the worker process.
 */
@Module({
	imports: [
		MainConfigModule,
		CloudRuS3Module,
		BullModule.forRootAsync({
			imports: [MainConfigModule],
			inject: [MainConfigService],
			useFactory: (mainConfig: MainConfigService) => ({
				connection: buildBullmqConnection(mainConfig),
			}),
		}),
		BullModule.registerQueue({ name: QueueNames.SUBTITLES_GENERATION }),
	],
	providers: [PrismaService, VideoPrivateRepository, SubtitlesGenerationProcessor],
})
export class WorkerModule {}
