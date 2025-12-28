import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CreateBookHandler } from 'src/features/bookPrivate/CreateBook.command'
import { TokenUsageBalanceChargeHandler } from 'features/payment/TokenUsageBalanceCharge.command'
import { GetBookHandler } from 'src/features/bookPrivate/GetBook.command'
import { BalanceTransactionRepository } from 'src/repo/balanceTransaction.repository'
import { BookPrivateQueryRepository } from 'src/repo/bookPrivate.queryRepository'
import { BookPublicQueryRepository } from 'src/repo/bookPublic.queryRepository'
import { BookPublicRepository } from 'src/repo/bookPublic.repository'
import { DBRepository } from 'src/repo/db.repository'
import { CreateBookWithEmptyChapterHandler } from 'src/features/bookPrivate/CreateBookWithEmptyChapter.command'
import { DeleteBookHandler } from 'src/features/bookPrivate/DeleteBook.command'
import { GetUserBooksHandler } from 'src/features/bookPrivate/GetUserBooks.command'
import { BookPrivateRepository } from 'src/repo/bookPrivate.repository'
import { UserRepository } from 'src/repo/user.repository'
import { BookResolver } from './book.resolver'
import { PrismaService } from 'db/prisma.service'
import { UpdateBookHandler } from 'src/features/bookPrivate/UpdateBook.command'
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
