import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CreateBookChapterHandler } from '../../features/bookChapter/CreateBookChapter.command'
import { DeleteBookChapterHandler } from '../../features/bookChapter/DeleteBookChapter.command'
import { UpdateBookChapterHandler } from '../../features/bookChapter/UpdateBookChapter.command'
import { BookQueryRepository } from '../../repo/book.queryRepository'
import { BookRepository } from '../../repo/book.repository'
import { BookChapterQueryRepository } from '../../repo/bookChapter.queryRepository'
import { BookChapterRepository } from '../../repo/bookChapter.repository'
import { UserRepository } from '../../repo/user.repository'
import { BookChapterResolver } from './bookChapter.resolver'
import { PrismaService } from '../../db/prisma.service'

const services = [PrismaService]
const commandHandlers = [CreateBookChapterHandler, UpdateBookChapterHandler, DeleteBookChapterHandler]
const resolvers = [BookChapterResolver]
const repositories = [
	BookRepository,
	BookQueryRepository,
	BookChapterRepository,
	BookChapterQueryRepository,
	UserRepository,
]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class BookChapterModule {}
