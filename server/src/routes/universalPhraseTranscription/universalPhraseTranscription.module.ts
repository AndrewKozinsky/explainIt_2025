import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase/universalPhrase.queryRepository'
import { UniversalTranscriptionQueryRepository } from 'repo/universalPhrase/universalTranscription.queryRepository'
import { UniversalTranscriptionRepository } from 'repo/universalPhrase/universalTranscription.repository'
import { PrismaService } from 'db/prisma.service'
import { GetOrCreateUniversalPhraseTranscriptionHandler } from 'features/universalPhraseTranscription/CreateUniversalPhraseTranscription.command'
import { LlmProviderModule } from 'infrastructure/llmProviderAdapter/llmProvider.module'
import { UniversalPhraseTranscriptionController } from './universalPhraseTranscription.controller'

const services = [PrismaService]
const commandHandlers = [GetOrCreateUniversalPhraseTranscriptionHandler]
const repositories = [
	UniversalTranscriptionRepository,
	UniversalTranscriptionQueryRepository,
	UniversalPhraseQueryRepository,
]

@Module({
	imports: [CqrsModule, LlmProviderModule],
	controllers: [UniversalPhraseTranscriptionController],
	providers: [...services, ...commandHandlers, ...repositories],
})
export class UniversalPhraseTranscriptionModule {}
