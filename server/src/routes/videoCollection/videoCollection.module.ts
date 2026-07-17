import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { VideoCollectionQueryRepository } from 'repo/videoCollection/videoCollection.queryRepository'
import { PrismaService } from 'db/prisma.service'
import { GetPublicVideoCollectionHandler } from 'features/videoCollection/GetPublicVideoCollection.command'
import { GetVideoCollectionHandler } from 'features/videoCollection/GetVideoCollection.command'
import { VideoCollectionController } from './videoCollection.controller'

const services = [PrismaService]
const commandHandlers = [GetPublicVideoCollectionHandler, GetVideoCollectionHandler]
const repositories = [VideoCollectionQueryRepository]

@Module({
	imports: [CqrsModule],
	controllers: [VideoCollectionController],
	providers: [...services, ...commandHandlers, ...repositories],
})
export class VideoCollectionModule {}
