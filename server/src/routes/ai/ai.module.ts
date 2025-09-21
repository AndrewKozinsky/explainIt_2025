import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CheckTranslationByAiHandler } from 'features/ai/checkTranslationByAI.command'
import { GetTranscriptionByAiHandler } from 'features/ai/getTranscriptionByAI.command'
import { PrismaService } from 'src/db/prisma.service'
import { AnalyseSentenceAndPhraseHandler } from 'src/features/ai/analyseSentenceAndPhrase.command'
import { CheckSessionCookieGuard } from 'src/infrastructure/guards/checkSessionCookie.guard'
import { UserRepository } from 'src/repo/user.repository'
import { AiResolver } from './ai.resolver'

const commandHandlers = [CheckTranslationByAiHandler, GetTranscriptionByAiHandler, AnalyseSentenceAndPhraseHandler]
const resolvers = [AiResolver]
const repositories = [UserRepository]
const services = [PrismaService]

@Module({
	imports: [CqrsModule],
	providers: [...commandHandlers, ...resolvers, ...repositories, ...services, CheckSessionCookieGuard],
})
export class AiModule {}
