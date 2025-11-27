import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CreateBookHandler } from 'features/book/CreateBook.command'
import { TokenUsageBalanceChargeHandler } from 'features/payment/TokenUsageBalanceCharge.command'
import { GetBookHandler } from 'src/features/book/GetBook.command'
import { BalanceTransactionRepository } from 'src/repo/balanceTransaction.repository'
import { BookPrivateQueryRepository } from 'src/repo/bookPrivate.queryRepository'
import { BookPublicQueryRepository } from 'src/repo/bookPublic.queryRepository'
import { BookPublicRepository } from 'src/repo/bookPublic.repository'
import { DBRepository } from 'src/repo/db.repository'
import { CreateBookWithEmptyChapterHandler } from 'features/book/CreateBookWithEmptyChapter.command'
import { DeleteBookHandler } from 'features/book/DeleteBook.command'
import { GetUserBooksHandler } from 'features/book/GetUserBooks.command'
import { BookPrivateRepository } from 'src/repo/bookPrivate.repository'
import { UserRepository } from 'src/repo/user.repository'
import { BookResolver } from './book.resolver'
import { PrismaService } from 'db/prisma.service'
import { UpdateBookHandler } from 'features/book/UpdateBook.command'
import { BookChapterRepository } from 'src/repo/bookChapter.repository'

const services = [PrismaService]
const commandHandlers = [
	CreateBookHandler,
	CreateBookWithEmptyChapterHandler,
	GetUserBooksHandler,
	GetBookHandler,
	UpdateBookHandler,
	DeleteBookHandler,
	TokenUsageBalanceChargeHandler,
]
const resolvers = [BookResolver]
const repositories = [
	BookPrivateRepository,
	BookPublicRepository,
	BookChapterRepository,
	UserRepository,
	BalanceTransactionRepository,
	DBRepository,
	BookPrivateQueryRepository,
	BookPublicQueryRepository,
]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class BookModule {}
