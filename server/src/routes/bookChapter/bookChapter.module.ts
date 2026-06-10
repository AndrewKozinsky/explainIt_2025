import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { BookChapterQueryRepository } from 'repo/bookChapter/bookChapter.queryRepository'
import { BookChapterRepository } from 'repo/bookChapter/bookChapter.repository'
import { BookPrivateQueryRepository } from 'repo/bookPrivate.queryRepository'
import { BookPrivateRepository } from 'repo/bookPrivate.repository'
import { BookPublicRepository } from 'repo/bookPublic.repository'
import { GrammarConceptQueryRepository } from 'repo/grammarConcept.queryRepository'
import { SentenceRepository } from 'repo/sentence.repository'
import { UniversalPhraseQueryRepository } from 'repo/universalPhrase.queryRepository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { CreateBookChapterHandler } from 'features/bookChapter/CreateBookChapter.command'
import { DeleteBookChapterHandler } from 'features/bookChapter/DeleteBookChapter.command'
import { GetBookChapterHandler } from 'features/bookChapter/GetBookChapter.command'
import { UpdateBookChapterHandler } from 'features/bookChapter/UpdateBookChapter.command'
import { BookChapterResolver } from './bookChapter.resolver'

const services = [PrismaService]
const commandHandlers = [
	CreateBookChapterHandler,
	UpdateBookChapterHandler,
	DeleteBookChapterHandler,
	GetBookChapterHandler,
]
const resolvers = [BookChapterResolver]
const repositories = [
	BookPrivateRepository,
	BookPrivateQueryRepository,
	BookChapterRepository,
	BookChapterQueryRepository,
	GrammarConceptQueryRepository,
	UniversalPhraseQueryRepository,
	UserRepository,
	BookPublicRepository,
	SentenceRepository,
]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class BookChapterModule {}
