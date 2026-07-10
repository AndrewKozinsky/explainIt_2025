import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { UniversalPhraseRepository } from 'repo/universalPhrase.repository'
import { PrismaService } from 'db/prisma.service'
import { CreateUniversalPhraseHandler } from 'features/universalPhrase/GetOrCreateUniversalPhrase.command'
import { GetUniversalPhraseHandler } from 'features/universalPhrase/GetUniversalPhrase.command'
import { UniversalPhraseController } from './universalPhrase.controller'

const services = [PrismaService]
const commandHandlers = [GetUniversalPhraseHandler, CreateUniversalPhraseHandler]
const repositories = [UniversalPhraseRepository, UniversalPhraseQueryRepository]

@Module({
	imports: [CqrsModule],
	controllers: [UniversalPhraseController],
	providers: [...services, ...commandHandlers, ...repositories],
})
export class UniversalPhraseModule {}
