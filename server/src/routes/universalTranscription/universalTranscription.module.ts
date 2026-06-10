import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { UniversalTranscriptionQueryRepository } from 'repo/universalTranscription.queryRepository'
import { UniversalTranscriptionRepository } from 'repo/universalTranscription.repository'
import { UniversalTranscriptionResolver } from 'routes/universalTranscription/universalTranscription.resolver'
import { PrismaService } from 'db/prisma.service'
import { CreateUniversalTranscriptionHandler } from 'features/universalTranscription/CreateUniversalTranscription.command'
import { LlmProviderModule } from 'infrastructure/llmProviderAdapter/llmProvider.module'

const services = [PrismaService]
const commandHandlers = [CreateUniversalTranscriptionHandler]
const resolvers = [UniversalTranscriptionResolver]
const repositories = [
	UniversalTranscriptionRepository,
	UniversalTranscriptionQueryRepository,
	UniversalPhraseQueryRepository,
]

@Module({
	imports: [CqrsModule, LlmProviderModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class UniversalTranscriptionModule {}
