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

@Injectable()
export class BookChapterQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getBookChapterById(id: number) {
		const bookChapter = await this.prisma.bookChapter.findUnique({
			where: { id },
			include: { book: true, BookChapterPhrase: { include: { BookChapterPhraseExample: true } } },
		})

		if (!bookChapter) {
			return null
		}

		return this.mapDbBookChapterToOutBookChapter(bookChapter)
	}

	@CatchDbError()
	async getBookChapters(bookId: number) {
		const bookChapters = await this.prisma.bookChapter.findMany({
			where: { book_id: bookId },
			include: { book: true, BookChapterPhrase: { include: { BookChapterPhraseExample: true } } },
		})

		return bookChapters.map(this.mapDbBookChapterToOutBookChapter)
	}

	mapDbBookChapterToOutBookChapter(dbBook: FullBookChapter): BookChapterOutModel {
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
				sentence: phrase.sentence,
				phrase: phrase.phrase,
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
