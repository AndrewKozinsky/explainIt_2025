import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ImageGenerationAssetsRepository } from 'repo/aiDialogue/imageGenerationAssets.repository'
import { ImageGenerationRequestRepository } from 'repo/aiDialogue/imageGenerationRequest.repository'
import { ImageGenerationWorkerRepository } from 'repo/aiDialogue/imageGenerationWorker.repository'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase/universalPhrase.queryRepository'
import { UniversalPhraseTranslationRepository } from 'repo/universalPhrase/universalPhraseTranslation.repository'
import { WordSenseRepository } from 'repo/universalPhrase/wordSense.repository'
import { VideoQueryRepository } from 'repo/video/video.queryRepository'
import { VideoRepository } from 'repo/video/video.repository'
import { PrismaService } from 'db/prisma.service'
import { AiDialogueImageGenerationProcessor } from 'features/aiDialogue/imageGeneration/AiDialogueImageGeneration.processor'
import { GenerateAiDialogueImage } from 'features/aiDialogue/imageGeneration/GenerateAiDialogueImage.service'
import { ImageGenerationAssets } from 'features/aiDialogue/imageGeneration/ImageGenerationAssets'
import { R2ImageGenerationAssets } from 'features/aiDialogue/imageGeneration/R2ImageGenerationAssets.service'
import { BillingModule } from 'features/billing/billing.module'
import { DictionaryEnrichmentProcessor } from 'features/universalPhraseTranslation/enrichment/DictionaryEnrichment.processor'
import { GenerateDictionaryDeepSections } from 'features/universalPhraseTranslation/enrichment/GenerateDictionaryDeepSections.service'
import { GenerateWordSenseImage } from 'features/universalPhraseTranslation/enrichment/GenerateWordSenseImage.service'
import { S3SubtitlesStrategy } from 'features/video/subtitlesGeneration/strategies/S3SubtitlesStrategy'
import { YoutubeSubtitlesStrategy } from 'features/video/subtitlesGeneration/strategies/YoutubeSubtitlesStrategy'
import { SubtitlesGenerationProcessor } from 'features/video/subtitlesGeneration/SubtitlesGeneration.processor'
import { UpdateVideoHandler } from 'features/video/UpdateVideo.command'
import { CloudflareS3Module } from 'infrastructure/cloudflareS3/cloudflareS3.module'
import { DeepgramSttModule } from 'infrastructure/deepgramStt/deepgramStt.module'
import { DeepSeekModule } from 'infrastructure/deepSeek/deepSeek.module'
import { GoogleGeminiModule } from 'infrastructure/googleGemini/googleGemini.module'
import { ImageGenerationProviderModule } from 'infrastructure/imageGenerationProviderAdapter/imageGenerationProvider.module'
import { ImageProcessingService } from 'infrastructure/imageProcessing/imageProcessing.service'
import { LlmProviderModule } from 'infrastructure/llmProviderAdapter/llmProvider.module'
import { MainConfigModule } from 'infrastructure/mainConfig/mainConfig.module'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'
import { MimoModule } from 'infrastructure/mimo/mimo.module'
import { OpenAIModule } from 'infrastructure/openAI/openAI.module'
import { PosthogModule } from 'infrastructure/posthog/posthog.module'
import { buildBullmqConnection } from 'infrastructure/queues/bullmq.connection'
import { QueueNames } from 'infrastructure/queues/queueNames'
import { AiDialogueVisualNotificationsModule } from 'infrastructure/redis/aiDialogueVisualNotifications.module'
import { SubtitlesModule } from 'infrastructure/subtitles/subtitles.module'
import { YoutubeService } from 'infrastructure/youtube/youtube.service'
import { ZaiModule } from 'infrastructure/zai/zai.module'

/**
 * Worker-side Nest app. Runs in a separate process (main.worker.ts).
 *
 * Wires the subtitles, AI dialogue image and dictionary enrichment processors:
 *   - Shared BullMQ connection + queue registration
 *   - CQRS + reused handlers (UpdateVideoCommand for SRT persistence)
 *   - Prisma + all repos those handlers touch
 *   - CloudflareS3 (S3 download) + Deepgram STT (ASR)
 *
 * AppModule is intentionally NOT imported: GraphQL/Express/Apollo would try
 * to boot an HTTP server on start, which the worker doesn't need.
 */
@Module({
	imports: [
		CqrsModule,
		MainConfigModule,
		PosthogModule,
		BillingModule,
		DeepSeekModule,
		ZaiModule,
		MimoModule,
		GoogleGeminiModule,
		OpenAIModule,
		LlmProviderModule,
		ImageGenerationProviderModule,
		CloudflareS3Module,
		AiDialogueVisualNotificationsModule,
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
		BullModule.registerQueue({ name: QueueNames.AI_DIALOGUE_IMAGE_GENERATION }),
		BullModule.registerQueue({ name: QueueNames.DICTIONARY_ENRICHMENT }),
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
		ImageGenerationRequestRepository,
		ImageGenerationWorkerRepository,
		GenerateAiDialogueImage,
		AiDialogueImageGenerationProcessor,
		ImageGenerationAssetsRepository,
		{ provide: ImageGenerationAssets, useClass: R2ImageGenerationAssets },
		UniversalPhraseTranslationRepository,
		WordSenseRepository,
		ImageProcessingService,
		GenerateDictionaryDeepSections,
		GenerateWordSenseImage,
		DictionaryEnrichmentProcessor,
	],
})
export class WorkerModule {}
