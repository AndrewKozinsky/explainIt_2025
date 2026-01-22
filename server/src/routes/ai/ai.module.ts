import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { CheckTranslationByAiHandler } from 'features/ai/checkTranslationByAI.command'
import { GetTranscriptionByAiHandler } from 'features/ai/getTranscriptionByAI.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { AiResolver } from './ai.resolver'

const commandHandlers = [CheckTranslationByAiHandler, GetTranscriptionByAiHandler]
const resolvers = [AiResolver]
const repositories = [UserRepository]
const services = [PrismaService]

@Module({
	imports: [CqrsModule],
	providers: [...commandHandlers, ...resolvers, ...repositories, ...services, CheckSessionCookieGuard],
})
export class AiModule {}
