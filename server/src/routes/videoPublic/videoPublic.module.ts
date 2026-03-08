import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { VideoPublicQueryRepository } from 'repo/video/videoPublic.queryRepository'
import { VideoPublicRepository } from 'repo/video/videoPublic.repository'
import { VideoPublicResolver } from 'routes/videoPublic/videoPublic.resolver'
import { CreatePublicVideosHandler } from 'src/features/video/CreatePublicVideos.command'
import { PrismaService } from 'db/prisma.service'
import { CreatePublicVideoHandler } from 'features/video/CreatePublicVideo.command'
import { GetVideoPublicHandler } from 'features/video/GetVideoPublic.command'
import { GetVideosPublicHandler } from 'features/video/GetVideosPublic.command'
import { MainConfigService } from 'infrastructure/mainConfig/mainConfig.service'

const services = [PrismaService, MainConfigService]
const commandHandlers = [
	GetVideosPublicHandler,
	GetVideoPublicHandler,
	CreatePublicVideoHandler,
	CreatePublicVideosHandler,
]
const resolvers = [VideoPublicResolver]
const repositories = [
	VideoPublicQueryRepository,
	VideoPublicRepository,
	SentenceRepository,
	SubtitleRepository,
	SubtitleSentenceInitRepository,
	DBRepository,
]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class VideoPublicModule {}
