import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CreateBookHandler } from 'features/book/CreateBook.command'
import { TokenUsageBalanceChargeHandler } from 'features/payment/TokenUsageBalanceCharge.command'
import { GetBookHandler } from 'src/features/book/GetBook.command'
import { CreateBookPublicHandler } from 'src/features/bookPublic/CreateBookPublic.command'
import { BalanceTransactionRepository } from 'src/repo/balanceTransaction.repository'
import { BookPublicRepository } from 'src/repo/bookPublic.repository'
import { DBRepository } from 'src/repo/db.repository'
import { CreateBookWithEmptyChapterHandler } from 'features/book/CreateBookWithEmptyChapter.command'
import { DeleteBookHandler } from 'features/book/DeleteBook.command'
import { GetUserBooksHandler } from 'features/book/GetUserBooks.command'
import { BookQueryRepository } from 'src/repo/book.queryRepository'
import { BookRepository } from 'src/repo/book.repository'
import { UserRepository } from 'src/repo/user.repository'
import { BookResolver } from './book.resolver'
import { PrismaService } from 'db/prisma.service'
import { UpdateBookHandler } from 'features/book/UpdateBook.command'

const services = [PrismaService]
const commandHandlers = [
	CreateBookHandler,
	CreateBookPublicHandler,
	CreateBookWithEmptyChapterHandler,
	GetUserBooksHandler,
	GetBookHandler,
	UpdateBookHandler,
	DeleteBookHandler,
	TokenUsageBalanceChargeHandler,
]
const resolvers = [BookResolver]
const repositories = [
	BookRepository,
	BookPublicRepository,
	BookQueryRepository,
	UserRepository,
	BalanceTransactionRepository,
	DBRepository,
]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class BookModule {}
