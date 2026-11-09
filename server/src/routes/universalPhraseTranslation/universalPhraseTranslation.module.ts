import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UniversalPhraseRepository } from 'repo/universalPhrase/universalPhrase.repository'
import { UniversalPhraseTranslationQueryRepository } from 'repo/universalPhrase/universalPhraseTranslation.queryRepository'
import { UniversalPhraseTranslationRepository } from 'repo/universalPhrase/universalPhraseTranslation.repository'
import { WordSenseRepository } from 'repo/universalPhrase/wordSense.repository'
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
	WordSenseRepository,
]

@Module({
	imports: [CqrsModule, LlmProviderModule],
	controllers: [UniversalPhraseTranslationController],
	providers: [...services, ...commandHandlers, ...repositories],
})
export class UniversalPhraseTranslationModule {}
