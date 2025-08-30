import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookChapterOutModel } from '../models/bookChapter/bookChapter.out.model'

type BookChapterWithBook = Prisma.BookChapterGetPayload<{ include: { book: true } }>

@Injectable()
export class BookChapterQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getBookChapterById(id: number) {
		const bookChapter = await this.prisma.bookChapter.findUnique({
			where: { id },
			include: { book: true },
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
			include: { book: true },
		})

		return bookChapters.map(this.mapDbBookChapterToOutBookChapter)
	}

	mapDbBookChapterToOutBookChapter(dbBook: BookChapterWithBook): BookChapterOutModel {
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
		}
	}
}
