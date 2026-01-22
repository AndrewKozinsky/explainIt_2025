import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UserRepository } from 'repo/user.repository'
import { VideoPrivateQueryRepository } from 'repo/videoPrivate.queryRepository'
import { VideoPrivateRepository } from 'repo/videoPrivate.repository'
import { VideoPrivateResolver } from 'routes/videoPrivate/videoPrivate.resolver'
import { PrismaService } from 'db/prisma.service'
import { CreatePrivateVideoHandler } from 'features/videoPrivate/CreatePrivateVideo.command'
import { DeletePrivateVideoHandler } from 'features/videoPrivate/DeletePrivateVideo.command'
import { GetUserVideosPrivateHandler } from 'features/videoPrivate/GetUserVideosPrivate.command'
import { GetVideoPrivateHandler } from 'features/videoPrivate/GetVideoPrivate.command'
import { UpdatePrivateVideoHandler } from 'features/videoPrivate/UpdatePrivateVideo.command'

const services = [PrismaService]
const commandHandlers = [
	CreatePrivateVideoHandler,
	UpdatePrivateVideoHandler,
	DeletePrivateVideoHandler,
	GetUserVideosPrivateHandler,
	GetVideoPrivateHandler,
]
const resolvers = [VideoPrivateResolver]
const repositories = [VideoPrivateRepository, VideoPrivateQueryRepository, UserRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class VideoPrivateModule {}
