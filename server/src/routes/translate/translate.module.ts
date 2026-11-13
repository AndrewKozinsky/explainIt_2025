import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SentencePhraseTranslationRepository } from 'repo/sentencePhraseTranslation.repository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { SentenceTranslationAccessService } from 'features/translation/translateCommon/SentenceTranslationAccess.service'
import { TranslatePhraseHandler } from 'features/translation/translatePhrase/TranslatePhrase.command'
import { TranslateSentenceHandler } from 'features/translation/translateSentence/TranslateSentence.command'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'
import { LlmProviderModule } from 'infrastructure/llmProviderAdapter/llmProvider.module'
import { TranslateController } from './translate.controller'

const services = [PrismaService, SentenceTranslationAccessService]
const commandHandlers = [TranslateSentenceHandler, TranslatePhraseHandler]
const repositories = [
	SentenceRepository,
	SentenceTranslationRepository,
	SentencePhraseTranslationRepository,
	UserRepository,
	DBRepository,
]

@Module({
	imports: [CqrsModule, LlmProviderModule],
	controllers: [TranslateController],
	providers: [...commandHandlers, ...services, ...repositories, OptionalSessionUserGuard],
})
export class TranslateRouteModule {}
