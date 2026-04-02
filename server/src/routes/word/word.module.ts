import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { WordQueryRepository } from 'repo/word.queryRepository'
import { WordRepository } from 'repo/word.repository'
import { PrismaService } from 'db/prisma.service'
import { CreateWordHandler } from 'features/word/CreateWord.command'
import { GetWordHandler } from 'features/word/GetWord.command'
import { WordResolver } from './word.resolver'

const services = [PrismaService]
const commandHandlers = [GetWordHandler, CreateWordHandler]
const resolvers = [WordResolver]
const repositories = [WordRepository, WordQueryRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class WordModule {}
