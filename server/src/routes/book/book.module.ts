import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { BookQueryRepository } from 'repo/book/book.queryRepository'
import { BookRepository } from 'repo/book/book.repository'
import { BookChapterQueryRepository } from 'repo/bookChapter/bookChapter.queryRepository'
import { BookChapterRepository } from 'repo/bookChapter/bookChapter.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase/universalPhrase.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { CreateBookWithEmptyChapterHandler } from 'features/bookPrivate/CreateBookWithEmptyChapter.command'
import { CreateBookHandler } from 'features/bookPrivate/CreatePrivateBook.command'
import { DeleteBookHandler } from 'features/bookPrivate/DeletePrivateBook.command'
import { GetBookHandler } from 'features/bookPrivate/GetBook.command'
import { GetUserBooksHandler } from 'features/bookPrivate/GetUserBooks.command'
import { UpdateBookHandler } from 'features/bookPrivate/UpdateBook.command'
import { CreateBookPublicHandler } from 'features/bookPublic/CreatePublicBook.command'
import { CreatePublicBooksHandler } from 'features/bookPublic/CreatePublicBooks.command'
import { GetBookPublicHandler } from 'features/bookPublic/GetPublicBook.command'
import { GetBooksPublicHandler } from 'features/bookPublic/GetPublicBooks.command'
import { BookController } from './book.controller'

const services = [PrismaService]
const commandHandlers = [
	CreateBookHandler,
	CreateBookWithEmptyChapterHandler,
	GetUserBooksHandler,
	GetBookHandler,
	UpdateBookHandler,
	DeleteBookHandler,
	CreatePublicBooksHandler,
	CreateBookPublicHandler,
	GetBooksPublicHandler,
	GetBookPublicHandler,
]
const repositories = [
	BookRepository,
	BookQueryRepository,
	BookChapterRepository,
	BookChapterQueryRepository,
	UniversalPhraseQueryRepository,
	UserRepository,
	SentenceRepository,
	SentenceTranslationRepository,
]

@Module({
	imports: [CqrsModule],
	controllers: [BookController],
	providers: [...services, ...commandHandlers, ...repositories],
})
export class BookModule {}
