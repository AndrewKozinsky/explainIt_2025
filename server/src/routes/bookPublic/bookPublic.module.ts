import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CreatePublicBooksHandler } from 'src/features/bookPublic/CreateBooksPublic.command'
import { BookChapterRepository } from 'src/repo/bookChapter.repository'
import { BookPublicQueryRepository } from 'src/repo/bookPublic.queryRepository'
import { BookPublicRepository } from 'src/repo/bookPublic.repository'
import { PrismaService } from 'db/prisma.service'
import { CreateBookPublicHandler } from 'src/features/bookPublic/CreateBookPublic.command'

const services = [PrismaService]
const commandHandlers = [CreatePublicBooksHandler, CreateBookPublicHandler]
const repositories = [BookPublicRepository, BookPublicQueryRepository, BookChapterRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...repositories],
})
export class BookPublicModule {}
