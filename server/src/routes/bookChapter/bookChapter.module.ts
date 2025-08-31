import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CreateBookChapterHandler } from '../../features/bookChapter/CreateBookChapter.command'
import { DeleteBookChapterHandler } from '../../features/bookChapter/DeleteBookChapter.command'
import { UpdateBookChapterHandler } from '../../features/bookChapter/UpdateBookChapter.command'
import { BookQueryRepository } from 'src/repo/book.queryRepository'
import { BookRepository } from 'src/repo/book.repository'
import { BookChapterQueryRepository } from 'src/repo/bookChapter.queryRepository'
import { BookChapterRepository } from 'src/repo/bookChapter.repository'
import { UserRepository } from 'src/repo/user.repository'
import { BookChapterResolver } from './bookChapter.resolver'
import { PrismaService } from '../../db/prisma.service'
import { GetBookChapterHandler } from '../../features/bookChapter/GetBookChapter.command'

const services = [PrismaService]
const commandHandlers = [
	CreateBookChapterHandler,
	UpdateBookChapterHandler,
	DeleteBookChapterHandler,
	GetBookChapterHandler,
]
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
