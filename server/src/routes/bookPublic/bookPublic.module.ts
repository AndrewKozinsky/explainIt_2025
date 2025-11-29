import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CreatePublicBooksHandler } from 'src/features/bookPublic/CreateBooksPublic.command'
import { GetBooksPublicHandler } from 'src/features/bookPublic/GetBooksPublic.command'
import { BookChapterRepository } from 'src/repo/bookChapter.repository'
import { BookPublicQueryRepository } from 'src/repo/bookPublic.queryRepository'
import { BookPublicRepository } from 'src/repo/bookPublic.repository'
import { PrismaService } from 'db/prisma.service'
import { CreateBookPublicHandler } from 'src/features/bookPublic/CreateBookPublic.command'
import { BookPublicResolver } from './bookPublic.resolver'

const services = [PrismaService]
const resolvers = [BookPublicResolver]
const commandHandlers = [CreatePublicBooksHandler, CreateBookPublicHandler, GetBooksPublicHandler]
const repositories = [BookPublicRepository, BookPublicQueryRepository, BookChapterRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...repositories, ...resolvers],
})
export class BookPublicModule {}
