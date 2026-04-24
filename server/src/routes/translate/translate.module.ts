import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
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
import { TranslateWithChatGPT } from 'features/translation/translateCommon/TranslateWithChatGPT.service'
import { TranslateWithDeepSeek } from 'features/translation/translateCommon/TranslateWithDeepSeek.service'
import { TranslateWithGemini } from 'features/translation/translateCommon/TranslateWithGemini.service'
import { TranslatePhraseHandler } from 'features/translation/translatePhrase/TranslatePhrase.command'
import { TranslateSentenceHandler } from 'features/translation/translateSentence/TranslateSentence.command'
import { OptionalSessionUserGuard } from 'infrastructure/guards/optionalSessionUser.guard'
import { TranslateResolver } from './translate.resolver'

const services = [PrismaService, SentenceTranslationAccessService]
const commandHandlers = [
	TranslateSentenceHandler,
	TranslatePhraseHandler,
	OpenAiTokenUsageBalanceChargeHandler,
	DeepSeekTokenUsageBalanceChargeHandler,
	GeminiTokenUsageBalanceChargeHandler,
]
const translateProviders = [TranslateWithDeepSeek, TranslateWithChatGPT, TranslateWithGemini]
const repositories = [
	SentenceRepository,
	SentenceTranslationRepository,
	SentencePhraseTranslationRepository,
	UserRepository,
	DBRepository,
	UserBalanceTransactionRepository,
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
