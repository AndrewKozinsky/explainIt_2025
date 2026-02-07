import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SubtitleRepository } from 'repo/subtitle.repository'
import { SubtitleSentenceInitRepository } from 'repo/subtitleSentenceInit.repository'
import { UserRepository } from 'repo/user.repository'
import { VideoPrivateQueryRepository } from 'repo/video/videoPrivate.queryRepository'
import { VideoPrivateRepository } from 'repo/video/videoPrivate.repository'
import { VideoPrivateResolver } from 'routes/videoPrivate/videoPrivate.resolver'
import { PrismaService } from 'db/prisma.service'
import { CreatePrivateVideoHandler } from 'features/video/CreatePrivateVideo.command'
import { DeletePrivateVideoHandler } from 'features/video/DeletePrivateVideo.command'
import { GetUserVideosPrivateHandler } from 'features/video/GetUserVideosPrivate.command'
import { GetVideoPrivateHandler } from 'features/video/GetVideoPrivate.command'
import { UpdatePrivateVideoHandler } from 'features/video/UpdatePrivateVideo.command'

const services = [PrismaService]
const commandHandlers = [
	CreatePrivateVideoHandler,
	UpdatePrivateVideoHandler,
	DeletePrivateVideoHandler,
	GetUserVideosPrivateHandler,
	GetVideoPrivateHandler,
]
const resolvers = [VideoPrivateResolver]
const repositories = [
	VideoPrivateRepository,
	VideoPrivateQueryRepository,
	UserRepository,
	SentenceRepository,
	SubtitleRepository,
	SubtitleSentenceInitRepository,
	DBRepository,
]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class VideoPrivateModule {}
