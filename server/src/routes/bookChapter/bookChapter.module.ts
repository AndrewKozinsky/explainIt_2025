import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { BookChapterQueryRepository } from 'repo/bookChapter.queryRepository'
import { BookChapterRepository } from 'repo/bookChapter.repository'
import { BookPrivateQueryRepository } from 'repo/bookPrivate.queryRepository'
import { BookPrivateRepository } from 'repo/bookPrivate.repository'
import { BookPublicRepository } from 'repo/bookPublic.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
// import { AnalysePhraseHandler } from 'features/bookChapter/AnalysePhrase.command'
import { CreateBookChapterHandler } from 'features/bookChapter/CreateBookChapter.command'
import { DeleteBookChapterHandler } from 'features/bookChapter/DeleteBookChapter.command'
import { GetBookChapterHandler } from 'features/bookChapter/GetBookChapter.command'
// import { TranslateSentencesHandler } from 'features/bookChapter/TranslateSentences.command'
import { UpdateBookChapterHandler } from 'features/bookChapter/UpdateBookChapter.command'
import { BookChapterResolver } from './bookChapter.resolver'

const services = [PrismaService]
const commandHandlers = [
	CreateBookChapterHandler,
	UpdateBookChapterHandler,
	DeleteBookChapterHandler,
	GetBookChapterHandler,
	// AnalysePhraseHandler,
	// TranslateSentencesHandler,
]
const resolvers = [BookChapterResolver]
const repositories = [
	BookPrivateRepository,
	BookPrivateQueryRepository,
	BookChapterRepository,
	BookChapterQueryRepository,
	UserRepository,
	BookPublicRepository,
	SentenceRepository,
]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...resolvers, ...repositories],
})
export class BookChapterModule {}
