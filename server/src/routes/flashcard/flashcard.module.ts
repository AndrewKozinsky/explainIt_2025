import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { FlashcardQueryRepository } from 'repo/flashcard.queryRepository'
import { FlashcardRepository } from 'repo/flashcard.repository'
import { SentenceRepository } from 'repo/sentence.repository'
import { SentencePhraseTranslationRepository } from 'repo/sentencePhraseTranslation.repository'
import { SentenceTranslationRepository } from 'repo/sentenceTranslation.repository'
import { UserRepository } from 'repo/user.repository'
import { PrismaService } from 'db/prisma.service'
import { AddFlashcardHandler } from 'features/flashcard/AddFlashcard.command'
import { GetMyFlashcardsHandler } from 'features/flashcard/GetMyFlashcards.query'
import { RemoveFlashcardHandler } from 'features/flashcard/RemoveFlashcard.command'
import { CheckSessionCookieGuard } from 'infrastructure/guards/checkSessionCookie.guard'
import { FlashcardResolver } from './flashcard.resolver'

const services = [PrismaService]

const handlers = [AddFlashcardHandler, RemoveFlashcardHandler, GetMyFlashcardsHandler]

const repositories = [
	FlashcardRepository,
	FlashcardQueryRepository,
	SentenceRepository,
	SentencePhraseTranslationRepository,
	SentenceTranslationRepository,
	UserRepository,
]

@Module({
	imports: [CqrsModule],
	providers: [...services, ...handlers, ...repositories, CheckSessionCookieGuard, FlashcardResolver],
})
export class FlashcardModule {}
