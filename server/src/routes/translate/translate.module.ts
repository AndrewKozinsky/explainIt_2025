import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SentencePhraseTranslationRepository } from 'repo/sentencePhraseTranslation.repository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { SubscriptionBalanceTransactionRepository } from 'repo/subscriptionBalanceTransaction.repository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { DeepSeekTokenUsageBalanceChargeHandler } from 'features/payment/DeepSeekTokenUsageBalanceCharge.command'
import { OpenAiTokenUsageBalanceChargeHandler } from 'features/payment/OpenAiTokenUsageBalanceCharge.command'
import { DailyTranslationLimitService } from 'features/sentenceTranslation/translate/DailyTranslationLimit.service'
import { SentenceTranslationAccessService } from 'features/sentenceTranslation/translate/SentenceTranslationAccess.service'
import { TranslatePhraseHandler } from 'features/sentenceTranslation/translatePhrase/TranslatePhrase.command'
import { TranslatePhraseWithDeepSeek } from 'features/sentenceTranslation/translatePhrase/TranslatePhraseWithDeepSeek.service'
import { StreamTranslateWithChatGPT } from 'features/sentenceTranslation/translateSentence/StreamTranslateWithChatGPT.service'
import { StreamTranslateWithDeepSeek } from 'features/sentenceTranslation/translateSentence/StreamTranslateWithDeepSeek.service'
import { TranslateSentenceHandler } from 'features/sentenceTranslation/translateSentence/TranslateSentence.command'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'
import { TranslateResolver } from './translate.resolver'

const services = [PrismaService, SentenceTranslationAccessService, DailyTranslationLimitService]
const commandHandlers = [
	TranslateSentenceHandler,
	TranslatePhraseHandler,
	OpenAiTokenUsageBalanceChargeHandler,
	DeepSeekTokenUsageBalanceChargeHandler,
]
const translateProviders = [StreamTranslateWithDeepSeek, StreamTranslateWithChatGPT, TranslatePhraseWithDeepSeek]
const repositories = [
	SentenceRepository,
	SentenceTranslationRepository,
	SentencePhraseTranslationRepository,
	UserRepository,
	DBRepository,
	SubscriptionBalanceTransactionRepository,
]

@Module({
	imports: [CqrsModule],
	providers: [
		...commandHandlers,
		...translateProviders,
		...services,
		...repositories,
		OptionalSessionUserGuard,
		TranslateResolver,
	],
})
export class TranslateRouteModule {}
