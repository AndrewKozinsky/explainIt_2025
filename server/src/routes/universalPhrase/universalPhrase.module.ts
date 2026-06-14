import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { UniversalPhraseRepository } from 'repo/universalPhrase.repository'
import { PrismaService } from 'db/prisma.service'
import { CreateUniversalPhraseHandler } from 'features/universalPhrase/GetOrCreateUniversalPhrase.command'
import { GetUniversalPhraseHandler } from 'features/universalPhrase/GetUniversalPhrase.command'
import { UniversalPhraseResolver } from './universalPhrase.resolver'

const services = [PrismaService]
const commandHandlers = [GetUniversalPhraseHandler, CreateUniversalPhraseHandler]
const resolvers = [UniversalPhraseResolver]
const repositories = [UniversalPhraseRepository, UniversalPhraseQueryRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class UniversalPhraseModule {}
