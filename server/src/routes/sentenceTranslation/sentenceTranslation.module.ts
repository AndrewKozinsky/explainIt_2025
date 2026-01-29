import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { SentenceTranslationQueryRepository } from 'repo/sentenceTranslation.queryRepository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { GetSentenceTranslationHandler } from 'features/sentenceTranslation/GetSentenceTranslation.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { SentenceTranslationResolver } from './sentenceTranslation.resolver'

const services = [PrismaService]
const commandHandlers = [GetSentenceTranslationHandler]
const resolvers = [SentenceTranslationResolver]
const repositories = [SentenceTranslationQueryRepository, SentenceTranslationRepository, UserRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories, CheckSessionCookieGuard],
})
export class SentenceTranslationModule {}
