import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase/universalPhrase.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
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
import { ChargeSubtitlesGenerationHandler } from 'features/video/subtitlesGeneration/ChargeSubtitlesGeneration.command'
import { StartGenerateSubtitlesHandler } from 'features/video/subtitlesGeneration/GenerateSubtitles.command'
import { GetSubtitlesGenerationStatusHandler } from 'features/video/subtitlesGeneration/GetSubtitlesGenerationStatus.command'
import { UpdatePrivateVideoHandler } from 'features/video/UpdatePrivateVideo.command'

const services = [PrismaService]
const commandHandlers = [
	CreatePrivateVideoHandler,
	CreatePublicVideoHandler,
	CreatePublicVideosHandler,
	UpdatePrivateVideoHandler,
	DeletePrivateVideoHandler,
	GetVideosHandler,
	GetVideoHandler,
	StartGenerateSubtitlesHandler,
	GetSubtitlesGenerationStatusHandler,
	ChargeSubtitlesGenerationHandler,
]
const repositories = [
	VideoRepository,
	VideoQueryRepository,
	UserRepository,
	SentenceRepository,
	SubtitleRepository,
	SubtitleSentenceInitRepository,
	DBRepository,
	UserBalanceTransactionRepository,
	UniversalPhraseQueryRepository,
]

@Module({
	imports: [CqrsModule],
	controllers: [VideoController],
	providers: [...services, ...commandHandlers, ...repositories],
})
export class VideoModule {}
