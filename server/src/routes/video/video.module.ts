import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase/universalPhrase.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { VideoQueryRepository } from 'repo/video/video.queryRepository'
import { VideoRepository } from 'repo/video/video.repository'
import { VideoController } from 'routes/video/video.controller'
import { PrismaService } from 'db/prisma.service'
import { CreatePrivateVideoHandler } from 'features/video/CreatePrivateVideo.command'
import { CreatePublicVideoHandler } from 'features/video/CreatePublicVideo.command'
import { CreatePublicVideosHandler } from 'features/video/CreatePublicVideos.command'
import { DeletePrivateVideoHandler } from 'features/video/DeletePrivateVideo.command'
import { GetVideoHandler } from 'features/video/GetVideo.command'
import { GetVideosHandler } from 'features/video/GetVideos.command'
import { StartGenerateSubtitlesHandler } from 'features/video/subtitlesGeneration/GenerateSubtitles.command'
import { GetSubtitlesGenerationStatusHandler } from 'features/video/subtitlesGeneration/GetSubtitlesGenerationStatus.command'
import { UpdateVideoHandler } from 'features/video/UpdateVideo.command'

const services = [PrismaService]
const commandHandlers = [
	CreatePrivateVideoHandler,
	CreatePublicVideoHandler,
	CreatePublicVideosHandler,
	UpdateVideoHandler,
	DeletePrivateVideoHandler,
	GetVideosHandler,
	GetVideoHandler,
	StartGenerateSubtitlesHandler,
	GetSubtitlesGenerationStatusHandler,
]
const repositories = [
	VideoRepository,
	VideoQueryRepository,
	UserRepository,
	SentenceRepository,
	SubtitleRepository,
	SubtitleSentenceInitRepository,
	DBRepository,
	UniversalPhraseQueryRepository,
]

@Module({
	imports: [CqrsModule],
	controllers: [VideoController],
	providers: [...services, ...commandHandlers, ...repositories],
})
export class VideoModule {}
