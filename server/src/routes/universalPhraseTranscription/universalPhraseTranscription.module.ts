import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { UniversalTranscriptionQueryRepository } from 'repo/universalTranscription.queryRepository'
import { UniversalTranscriptionRepository } from 'repo/universalTranscription.repository'
import { UniversalPhraseTranscriptionResolver } from 'routes/universalPhraseTranscription/universalPhraseTranscription.resolver'
import { PrismaService } from 'db/prisma.service'
import { GetOrCreateUniversalPhraseTranscriptionHandler } from 'features/universalPhraseTranscription/CreateUniversalPhraseTranscription.command'
import { LlmProviderModule } from 'infrastructure/llmProviderAdapter/llmProvider.module'

const services = [PrismaService]
const commandHandlers = [GetOrCreateUniversalPhraseTranscriptionHandler]
const resolvers = [UniversalPhraseTranscriptionResolver]
const repositories = [
	UniversalTranscriptionRepository,
	UniversalTranscriptionQueryRepository,
	UniversalPhraseQueryRepository,
]

@Module({
	imports: [CqrsModule, LlmProviderModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class UniversalPhraseTranscriptionModule {}
