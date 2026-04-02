import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TranscriptionQueryRepository } from 'repo/transcription.queryRepository'
import { TranscriptionRepository } from 'repo/transcription.repository'
import { WordQueryRepository } from 'repo/word.queryRepository'
import { PrismaService } from 'db/prisma.service'
import { CreateTranscriptionHandler } from 'features/word/CreateTranscription.command'
import { TranscriptionResolver } from './transcription.resolver'

const services = [PrismaService]
const commandHandlers = [CreateTranscriptionHandler]
const resolvers = [TranscriptionResolver]
const repositories = [TranscriptionRepository, TranscriptionQueryRepository, WordQueryRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class TranscriptionModule {}
