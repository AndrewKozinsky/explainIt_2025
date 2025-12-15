import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CreateBookChapterHandler } from 'features/bookChapter/CreateBookChapter.command'
import { DeleteBookChapterHandler } from 'features/bookChapter/DeleteBookChapter.command'
import { UpdateBookChapterHandler } from 'features/bookChapter/UpdateBookChapter.command'
import { AnalysePhraseHandler } from 'features/bookChapter/AnalysePhrase.command'
import { DeleteBookChapterPhrasesHandler } from 'src/features/bookChapter/DeleteBookChapterPhrases.command'
import { TranslateSentencesHandler } from 'src/features/bookChapter/TranslateSentences.command'
import { BookPrivateQueryRepository } from 'src/repo/bookPrivate.queryRepository'
import { BookPrivateRepository } from 'src/repo/bookPrivate.repository'
import { BookChapterQueryRepository } from 'src/repo/bookChapter.queryRepository'
import { BookChapterRepository } from 'src/repo/bookChapter.repository'
import { BookChapterPhraseQueryRepository } from 'src/repo/bookChapterPhrase.queryRepository'
import { BookChapterPhraseRepository } from 'src/repo/bookChapterPhrase.repository'
import { BookChapterPhraseExampleRepository } from 'src/repo/bookChapterPhraseExample.repository'
import { BookPublicRepository } from 'src/repo/bookPublic.repository'
import { UserRepository } from 'src/repo/user.repository'
import { BookChapterResolver } from './bookChapter.resolver'
import { PrismaService } from 'db/prisma.service'
import { GetBookChapterHandler } from 'features/bookChapter/GetBookChapter.command'

const services = [PrismaService]
const commandHandlers = [
	CreateBookChapterHandler,
	UpdateBookChapterHandler,
	DeleteBookChapterHandler,
	GetBookChapterHandler,
	AnalysePhraseHandler,
	DeleteBookChapterPhrasesHandler,
	TranslateSentencesHandler,
]
const resolvers = [BookChapterResolver]
const repositories = [
	BookPrivateRepository,
	BookPrivateQueryRepository,
	BookChapterRepository,
	BookChapterQueryRepository,
	UserRepository,
	BookChapterPhraseRepository,
	BookChapterPhraseQueryRepository,
	BookChapterPhraseExampleRepository,
	BookPublicRepository,
]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class BookChapterModule {}
