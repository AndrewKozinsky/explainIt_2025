import { Injectable } from '@nestjs/common'
import { Prisma } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookChapterOutModel } from '../models/bookChapter/bookChapter.out.model'

type FullBookChapter = Prisma.BookChapterGetPayload<{
	include: {
		book: true
		book_public: true
		Sentence: true
	}
}>

// Helper type: same as FullBookChapter but with non-nullable 'book' relation
type FullBookChapterPrivate = Omit<FullBookChapter, 'book'> & {
	book: NonNullable<FullBookChapter['book']>
	book_public: NonNullable<FullBookChapter['book_public']>
}

@Injectable()
export class BookChapterQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getBookChapterById(id: number) {
		const bookChapter = await this.prisma.bookChapter.findUnique({
			where: { id },
			include: {
				book: true,
				book_public: true,
				Sentence: {
					orderBy: { order_index: 'asc' },
				},
			},
		})

		if (!bookChapter) {
			return null
		}

		return this.mapDbBookChapterToOutBookChapter(bookChapter as FullBookChapterPrivate)
	}

	/*@CatchDbError()
	async getBookChapters(bookId: number) {
		const bookChapters = await this.prisma.bookChapter.findMany({
			where: { book_id: bookId },
			orderBy: { created_at: 'asc' },
			include: { book: true, BookChapterPhrase: { include: { BookChapterPhraseExample: true } } },
		})

		return bookChapters.map((ch) => this.mapDbBookChapterToOutBookChapter(ch as FullBookChapterPrivate))
	}*/

	mapDbBookChapterToOutBookChapter(dbChapter: FullBookChapterPrivate): BookChapterOutModel {
		const book = dbChapter.book_public ? dbChapter.book_public : dbChapter.book

		return {
			id: dbChapter.id,
			name: dbChapter.name,
			header: dbChapter.header,
			content: dbChapter.content,
			sentences: dbChapter.Sentence.map((s) => ({
				id: s.id,
				startOffset: s.start_offset,
				length: s.length,
			})),
			note: dbChapter.note,
			book: {
				id: book.id,
				name: book.name,
				author: book.author,
				note: book.note,
				userId: dbChapter.book_public ? null : dbChapter.book.user_id,
			},
		}
	}
}
