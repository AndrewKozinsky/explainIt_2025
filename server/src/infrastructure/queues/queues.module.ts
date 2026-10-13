import { BullModule } from '@nestjs/bullmq'
import { Global, Module } from '@nestjs/common'
import { MainConfigModule } from 'infrastructure/mainConfig/mainConfig.module'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { AiDialogueAudioGenerationQueue } from './aiDialogueAudioGeneration.queue'
import { AiDialogueImageGenerationQueue } from './aiDialogueImageGeneration.queue'
import { buildBullmqConnection } from './bullmq.connection'
import { QueueNames } from './queueNames'
import { SubtitlesGenerationQueue } from './subtitlesGeneration.queue'

/**
 * Global module exposing queue producers with shared Redis configuration.
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
		BullModule.registerQueueAsync({
			name: QueueNames.AI_DIALOGUE_AUDIO_GENERATION,
			imports: [MainConfigModule],
			inject: [MainConfigService],
			useFactory: (config: MainConfigService) => ({
				connection: {
					...buildBullmqConnection(config),
					maxRetriesPerRequest: 1,
					enableOfflineQueue: false,
					commandTimeout: 10_000,
					connectTimeout: 10_000,
				},
			}),
		}),
		BullModule.registerQueueAsync({
			name: QueueNames.AI_DIALOGUE_IMAGE_GENERATION,
			imports: [MainConfigModule],
			inject: [MainConfigService],
			useFactory: (mainConfig: MainConfigService) => ({
				connection: {
					...buildBullmqConnection(mainConfig),
					maxRetriesPerRequest: 1,
					enableOfflineQueue: false,
					commandTimeout: 10_000,
					connectTimeout: 10_000,
				},
			}),
		}),
	],
	providers: [AiDialogueAudioGenerationQueue, SubtitlesGenerationQueue, AiDialogueImageGenerationQueue],
	exports: [AiDialogueAudioGenerationQueue, BullModule, SubtitlesGenerationQueue, AiDialogueImageGenerationQueue],
})
export class QueuesModule {}
