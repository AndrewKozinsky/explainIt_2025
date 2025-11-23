import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookChapterOutModel } from '../models/bookChapter/bookChapter.out.model'

type FullBookChapter = Prisma.BookChapterGetPayload<{
	include: {
		book: true
		BookChapterPhrase: {
			include: {
				BookChapterPhraseExample: true
			}
		}
	}
}>

// Helper type: same as FullBookChapter but with non-nullable 'book' relation
type FullBookChapterPrivate = Omit<FullBookChapter, 'book'> & {
	book: NonNullable<FullBookChapter['book']>
}

@Injectable()
export class BookChapterQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getBookChapterById(id: number) {
		const bookChapter = await this.prisma.bookChapter.findUnique({
			where: { id },
			include: { book: true, BookChapterPhrase: { include: { BookChapterPhraseExample: true } } },
		})

		if (!bookChapter || !bookChapter.book) {
			return null
		}

		return this.mapDbBookChapterToOutBookChapter(bookChapter as FullBookChapterPrivate)
	}

	@CatchDbError()
	async getBookChapters(bookId: number) {
		const bookChapters = await this.prisma.bookChapter.findMany({
			where: { book_id: bookId },
			orderBy: { created_at: 'asc' },
			include: { book: true, BookChapterPhrase: { include: { BookChapterPhraseExample: true } } },
		})

		return bookChapters.map((ch) => this.mapDbBookChapterToOutBookChapter(ch as FullBookChapterPrivate))
	}

	mapDbBookChapterToOutBookChapter(dbBook: FullBookChapterPrivate): BookChapterOutModel {
		return {
			id: dbBook.id,
			name: dbBook.name,
			header: dbBook.header,
			content: dbBook.content,
			note: dbBook.note,
			book: {
				id: dbBook.book.id,
				name: dbBook.book.name,
				author: dbBook.book.author,
				note: dbBook.book.note,
				userId: dbBook.book.user_id,
			},
			phrases: dbBook.BookChapterPhrase.map((phrase) => ({
				id: phrase.id,
				sentenceId: phrase.sentenceId,
				sentence: phrase.sentence,
				phrase: phrase.phrase,
				transcription: phrase.phraseTranscription,
				phraseWordsIdx: phrase.phraseWordsIdx,
				translation: phrase.phraseTranslation,
				analysis: phrase.phraseAnalysis,
				examples: phrase.BookChapterPhraseExample.map((example) => ({
					id: example.id,
					sentence: example.sentence,
					translation: example.translation,
				})),
			})),
		}
	}
}
