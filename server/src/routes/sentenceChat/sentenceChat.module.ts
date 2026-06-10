import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DBRepository } from 'repo/db.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SentenceChatMessageRepository } from 'repo/sentenceChatMessage.repository'
import { SentenceChatThreadQueryRepository } from 'repo/sentenceChatThread.queryRepository'
import { SentenceChatThreadRepository } from 'repo/sentenceChatThread.repository'
import { UserRepository } from 'repo/user.repository'
import { UserBalanceTransactionRepository } from 'repo/userBalanceTransaction.repository'
import { PrismaService } from 'db/prisma.service'
import { DeepSeekTokenUsageBalanceChargeHandler } from 'features/payment/DeepSeekTokenUsageBalanceCharge.command'
import { GeminiTokenUsageBalanceChargeHandler } from 'features/payment/GeminiTokenUsageBalanceCharge.command'
import { OpenAiTokenUsageBalanceChargeHandler } from 'features/payment/OpenAiTokenUsageBalanceCharge.command'
import { ActiveSentenceChatGenerationRegistry } from 'features/sentenceChat/ActiveSentenceChatGenerationRegistry.service'
import { CreateSentenceChatThreadHandler } from 'features/sentenceChat/CreateSentenceChatThread.command'
import { CreateSentenceChatUserMessageHandler } from 'features/sentenceChat/CreateSentenceChatUserMessage.command'
import { GetSentenceChatThreadHandler } from 'features/sentenceChat/GetSentenceChatThread.query'
import { SentenceChatContextBuilder } from 'features/sentenceChat/SentenceChatContextBuilder.service'
import { StreamSentenceChatAssistantCommand } from 'features/sentenceChat/StreamSentenceChatAssistant.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { LlmProviderModule } from 'infrastructure/llmProviderAdapter/llmProvider.module'
import { SentenceChatController } from './sentenceChat.controller'
import { SentenceChatResolver } from './sentenceChat.resolver'

const services = [
	PrismaService,
	SentenceChatContextBuilder,
	ActiveSentenceChatGenerationRegistry,
	StreamSentenceChatAssistantCommand,
]

const handlers = [
	GetSentenceChatThreadHandler,
	CreateSentenceChatThreadHandler,
	CreateSentenceChatUserMessageHandler,
	GeminiTokenUsageBalanceChargeHandler,
	OpenAiTokenUsageBalanceChargeHandler,
	DeepSeekTokenUsageBalanceChargeHandler,
]

const repositories = [
	SentenceRepository,
	SentenceChatThreadRepository,
	SentenceChatThreadQueryRepository,
	SentenceChatMessageRepository,
	UserRepository,
	UserBalanceTransactionRepository,
	DBRepository,
]

@Module({
	imports: [CqrsModule, LlmProviderModule],
	controllers: [SentenceChatController],
	providers: [...services, ...handlers, ...repositories, CheckSessionCookieGuard, SentenceChatResolver],
})
export class SentenceChatModule {}
