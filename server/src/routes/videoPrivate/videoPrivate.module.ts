import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CreatePrivateVideoHandler } from 'src/features/videoPrivate/CreatePrivateVideo.command'
import { UpdatePrivateVideoHandler } from 'src/features/videoPrivate/UpdatePrivateVideo.command'
import { UserRepository } from 'src/repo/user.repository'
import { VideoPrivateQueryRepository } from 'src/repo/videoPrivate.queryRepository'
import { VideoPrivateRepository } from 'src/repo/videoPrivate.repository'
import { VideoPrivateResolver } from 'src/routes/videoPrivate/videoPrivate.resolver'
import { PrismaService } from 'db/prisma.service'

const services = [PrismaService]
const commandHandlers = [CreatePrivateVideoHandler, UpdatePrivateVideoHandler]
const resolvers = [VideoPrivateResolver]
const repositories = [VideoPrivateRepository, VideoPrivateQueryRepository, UserRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class VideoPrivateModule {}
