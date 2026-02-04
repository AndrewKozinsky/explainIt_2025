import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { BalanceTransactionRepository } from 'repo/balanceTransaction.repository'
import { DBRepository } from 'repo/db.repository'
import { EngRusDictionaryRepository } from 'repo/engRusDictionary.repository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { UserRepository } from 'repo/user.repository'
import { TranslateController } from 'routes/translate/translate.controller'
import { TranslateService } from 'routes/translate/translate.service'
import { PrismaService } from 'db/prisma.service'
import { OpenAiTokenUsageBalanceChargeHandler } from 'features/payment/OpenAiTokenUsageBalanceCharge.command'
import { StreamTranslateWithDeepSeek } from 'features/sentenceTranslation/translateSentence/StreamTranslateWithDeepSeek.service'
import { TranslateSentenceHandler } from 'features/sentenceTranslation/translateSentence/TranslateSentence.command'

const services = [PrismaService, TranslateService]
const commandHandlers = [TranslateSentenceHandler, OpenAiTokenUsageBalanceChargeHandler]
const translateProviders = [StreamTranslateWithDeepSeek]
const repositories = [
	EngRusDictionaryRepository,
	SentenceTranslationRepository,
	UserRepository,
	BalanceTransactionRepository,
	DBRepository,
]

@Module({
	imports: [CqrsModule],
	controllers: [TranslateController],
	providers: [...commandHandlers, ...translateProviders, ...services, ...repositories],
})
export class TranslateRouteModule {}
