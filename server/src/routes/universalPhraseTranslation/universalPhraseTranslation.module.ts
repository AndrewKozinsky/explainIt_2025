import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UniversalPhraseRepository } from 'repo/universalPhrase.repository'
import { UniversalPhraseTranslationQueryRepository } from 'repo/universalPhraseTranslation.queryRepository'
import { UniversalPhraseTranslationRepository } from 'repo/universalPhraseTranslation.repository'
import { PrismaService } from 'db/prisma.service'
import { GetOrCreateUniversalPhraseTranslationHandler } from 'features/universalPhraseTranslation/GetOrCreateUniversalPhraseTranslation.command'
import { LlmProviderModule } from 'infrastructure/llmProviderAdapter/llmProvider.module'
import { UniversalPhraseTranslationController } from './universalPhraseTranslation.controller'

const services = [PrismaService]
const commandHandlers = [GetOrCreateUniversalPhraseTranslationHandler]
const repositories = [
	UniversalPhraseRepository,
	UniversalPhraseTranslationRepository,
	UniversalPhraseTranslationQueryRepository,
]

@Module({
	imports: [CqrsModule, LlmProviderModule],
	controllers: [UniversalPhraseTranslationController],
	providers: [...services, ...commandHandlers, ...repositories],
})
export class UniversalPhraseTranslationModule {}
