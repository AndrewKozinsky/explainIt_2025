import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CreateBookHandler } from '../../features/book/CreateBook.command'
import { GetUserBooksHandler } from '../../features/book/GetUserBooks.command'
import { BookQueryRepository } from '../../repo/book.queryRepository'
import { BookRepository } from '../../repo/book.repository'
import { UserRepository } from '../../repo/user.repository'
import { BookResolver } from './book.resolver'
import { PrismaService } from '../../db/prisma.service'

const services = [PrismaService]
const commandHandlers = [CreateBookHandler, GetUserBooksHandler]
const resolvers = [BookResolver]
const repositories = [BookRepository, BookQueryRepository, UserRepository]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class BookModule {}
