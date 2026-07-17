import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { BookQueryRepository } from 'repo/book/book.queryRepository'
import { BookRepository } from 'repo/book/book.repository'
import { BookChapterQueryRepository } from 'repo/bookChapter/bookChapter.queryRepository'
import { BookChapterRepository } from 'repo/bookChapter/bookChapter.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase/universalPhrase.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { CreateBookChapterHandler } from 'features/bookChapter/CreateBookChapter.command'
import { DeleteBookChapterHandler } from 'features/bookChapter/DeleteBookChapter.command'
import { GetBookChapterHandler } from 'features/bookChapter/GetBookChapter.command'
import { UpdateBookChapterHandler } from 'features/bookChapter/UpdateBookChapter.command'
import { BookChapterController } from './bookChapter.controller'

const services = [PrismaService]
const commandHandlers = [
	CreateBookChapterHandler,
	UpdateBookChapterHandler,
	DeleteBookChapterHandler,
	GetBookChapterHandler,
]
const repositories = [
	BookRepository,
	BookQueryRepository,
	BookChapterRepository,
	BookChapterQueryRepository,
	UniversalPhraseQueryRepository,
	UserRepository,
	SentenceRepository,
]

@Module({
	imports: [CqrsModule],
	controllers: [BookChapterController],
	providers: [...services, ...commandHandlers, ...repositories],
})
export class BookChapterModule {}
