import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { BalanceTransactionRepository } from 'repo/balanceTransaction.repository'
import { BookChapterRepository } from 'repo/bookChapter.repository'
import { BookPrivateQueryRepository } from 'repo/bookPrivate.queryRepository'
import { BookPrivateRepository } from 'repo/bookPrivate.repository'
import { BookPublicQueryRepository } from 'repo/bookPublic.queryRepository'
import { BookPublicRepository } from 'repo/bookPublic.repository'
import { DBRepository } from 'repo/db.repository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { CreateBookHandler } from 'features/bookPrivate/CreateBook.command'
import { CreateBookWithEmptyChapterHandler } from 'features/bookPrivate/CreateBookWithEmptyChapter.command'
import { DeleteBookHandler } from 'features/bookPrivate/DeleteBook.command'
import { GetBookHandler } from 'features/bookPrivate/GetBook.command'
import { GetUserBooksHandler } from 'features/bookPrivate/GetUserBooks.command'
import { UpdateBookHandler } from 'features/bookPrivate/UpdateBook.command'
import { TokenUsageBalanceChargeHandler } from 'features/payment/TokenUsageBalanceCharge.command'
import { BookResolver } from './book.resolver'

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
