import { BullModule } from '@nestjs/bullmq'
import { Global, Module } from '@nestjs/common'
import { MainConfigModule } from 'infrastructure/mainConfig/mainConfig.module'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { buildBullmqConnection } from './bullmq.connection'
import { QueueNames } from './queueNames'
import { SubtitlesGenerationQueue } from './subtitlesGeneration.queue'

/**
 * Global module wiring a single BullMQ connection and exposing queue producer services.
 * Worker-side processors live in features/video/subtitlesGeneration/SubtitlesGeneration.processor.ts
 * and are registered in WorkerModule (main.worker.ts), not in AppModule.
 */
@Global()
@Module({
	imports: [
		BullModule.forRootAsync({
			imports: [MainConfigModule],
			inject: [MainConfigService],
			useFactory: (mainConfig: MainConfigService) => ({
				connection: buildBullmqConnection(mainConfig),
			}),
		}),
		BullModule.registerQueue({
			name: QueueNames.SUBTITLES_GENERATION,
			defaultJobOptions: {
				attempts: 3,
				backoff: { type: 'exponential', delay: 30_000 },
				removeOnComplete: { count: 100 },
				removeOnFail: { count: 500 },
			},
		}),
	],
	providers: [SubtitlesGenerationQueue],
	exports: [BullModule, SubtitlesGenerationQueue],
})
export class QueuesModule {}
