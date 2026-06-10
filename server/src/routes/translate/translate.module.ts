import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { FlashcardRepository } from 'repo/flashcard.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SentencePhraseTranslationRepository } from 'repo/sentencePhraseTranslation.repository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { UserRepository } from 'repo/user.repository'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { PrismaService } from 'db/prisma.service'
import { DeepSeekTokenUsageBalanceChargeHandler } from 'features/payment/DeepSeekTokenUsageBalanceCharge.command'
import { GeminiTokenUsageBalanceChargeHandler } from 'features/payment/GeminiTokenUsageBalanceCharge.command'
import { OpenAiTokenUsageBalanceChargeHandler } from 'features/payment/OpenAiTokenUsageBalanceCharge.command'
import { SentenceTranslationAccessService } from 'features/translation/translateCommon/SentenceTranslationAccess.service'
import { TranslatePhraseHandler } from 'features/translation/translatePhrase/TranslatePhrase.command'
import { TranslateSentenceHandler } from 'features/translation/translateSentence/TranslateSentence.command'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'
import { LlmProviderModule } from 'infrastructure/llmProviderAdapter/llmProvider.module'
import { TranslateResolver } from './translate.resolver'

const services = [PrismaService, SentenceTranslationAccessService]
const commandHandlers = [
	TranslateSentenceHandler,
	TranslatePhraseHandler,
	OpenAiTokenUsageBalanceChargeHandler,
	DeepSeekTokenUsageBalanceChargeHandler,
	GeminiTokenUsageBalanceChargeHandler,
]
const repositories = [
	SentenceRepository,
	SentenceTranslationRepository,
	SentencePhraseTranslationRepository,
	UserRepository,
	DBRepository,
	UserBalanceTransactionRepository,
	FlashcardRepository,
]

@Module({
	imports: [CqrsModule, LlmProviderModule],
	providers: [
		...commandHandlers,
		...services,
		...repositories,
		OptionalSessionUserGuard,
		TranslateResolver,
	],
})
export class TranslateRouteModule {}
