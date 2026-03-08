import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { BookChapterRepository } from 'repo/bookChapter.repository'
import { BookPublicQueryRepository } from 'repo/bookPublic.queryRepository'
import { BookPublicRepository } from 'repo/bookPublic.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { CreateBookPublicHandler } from 'src/features/bookPublic/CreatePublicBook.command'
import { CreatePublicBooksHandler } from 'src/features/bookPublic/CreatePublicBooks.command'
import { PrismaService } from 'db/prisma.service'
import { GetBookPublicHandler } from 'features/bookPublic/GetBookPublic.command'
import { GetBooksPublicHandler } from 'features/bookPublic/GetBooksPublic.command'
import { BookPublicResolver } from './bookPublic.resolver'

const services = [PrismaService]
const resolvers = [BookPublicResolver]
const commandHandlers = [CreatePublicBooksHandler, CreateBookPublicHandler, GetBooksPublicHandler, GetBookPublicHandler]
const repositories = [
	BookPublicRepository,
	BookPublicQueryRepository,
	BookChapterRepository,
	SentenceRepository,
	SentenceTranslationRepository,
]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...commandHandlers, ...repositories, ...resolvers],
})
export class BookPublicModule {}
