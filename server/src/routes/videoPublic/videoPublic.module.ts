import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { VideoPublicQueryRepository } from 'repo/video/videoPublic.queryRepository'
import { VideoPublicResolver } from 'routes/videoPublic/videoPublic.resolver'
import { PrismaService } from 'db/prisma.service'
import { CreatePublicVideosHandler } from 'features/video/CreateVideosPublic.command'
import { GetVideoPublicHandler } from 'features/video/GetVideoPublic.command'
import { GetVideosPublicHandler } from 'features/video/GetVideosPublic.command'

const services = [PrismaService]
const commandHandlers = [GetVideosPublicHandler, GetVideoPublicHandler, CreatePublicVideosHandler]
const resolvers = [VideoPublicResolver]
const repositories = [VideoPublicQueryRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class VideoPublicModule {}
