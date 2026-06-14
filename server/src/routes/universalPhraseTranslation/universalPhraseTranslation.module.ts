import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UniversalPhraseRepository } from 'repo/universalPhrase.repository'
import { UniversalPhraseTranslationQueryRepository } from 'repo/universalPhraseTranslation.queryRepository'
import { UniversalPhraseTranslationRepository } from 'repo/universalPhraseTranslation.repository'
import { UniversalPhraseTranslationResolver } from 'routes/universalPhraseTranslation/universalPhraseTranslation.resolver'
import { PrismaService } from 'db/prisma.service'
import { GetOrCreateUniversalPhraseTranslationHandler } from 'features/universalPhraseTranslation/GetOrCreateUniversalPhraseTranslation.command'
import { LlmProviderModule } from 'infrastructure/llmProviderAdapter/llmProvider.module'

const services = [PrismaService]
const commandHandlers = [GetOrCreateUniversalPhraseTranslationHandler]
const resolvers = [UniversalPhraseTranslationResolver]
const repositories = [
	UniversalPhraseRepository,
	UniversalPhraseTranslationRepository,
	UniversalPhraseTranslationQueryRepository,
]

@Module({
	imports: [CqrsModule, LlmProviderModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class UniversalPhraseTranslationModule {}
