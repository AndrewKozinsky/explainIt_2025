import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase/universalPhrase.queryRepository'
import { VideoQueryRepository } from 'repo/video/video.queryRepository'
import { VideoRepository } from 'repo/video/video.repository'
import { PrismaService } from 'db/prisma.service'
import { CreateYoutubeVideoHandler } from 'features/youtube/CreateYoutubeVideo.command'
import { GetSavedYoutubeVideosHandler } from 'features/youtube/GetSavedYoutubeVideos.command'
import { GetYoutubeRecommendationsHandler } from 'features/youtube/GetYoutubeRecommendations.command'
import { GetVideoByYoutubeIdHandler } from 'features/youtube/GetVideoByYoutubeId.command'
import { GetYoutubeVideoHandler } from 'features/youtube/GetYoutubeVideo.command'
import { GetYoutubeVideosHandler } from 'features/youtube/GetYoutubeVideos.command'
import { CloudflareS3Service } from 'infrastructure/cloudflareS3/cloudflareS3.service'
import { SubtitlesGenerationQueue } from 'infrastructure/queues/subtitlesGeneration.queue'
import { YoutubeController } from './youtube.controller'

@Module({
	imports: [CqrsModule],
	controllers: [YoutubeController],
	providers: [
		PrismaService,
		VideoRepository,
		VideoQueryRepository,
		UniversalPhraseQueryRepository,
		CloudflareS3Service,
		SubtitlesGenerationQueue,
		GetYoutubeVideoHandler,
		GetYoutubeVideosHandler,
		GetVideoByYoutubeIdHandler,
		CreateYoutubeVideoHandler,
		GetSavedYoutubeVideosHandler,
		GetYoutubeRecommendationsHandler,
	],
})
export class YoutubeRouteModule {}
