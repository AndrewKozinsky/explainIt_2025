import { Injectable } from '@nestjs/common'
import { BookChapter } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookChapterOutModel } from '../models/bookChapter/bookChapter.out.model'

@Injectable()
export class BookChapterQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getBookChapterById(id: number) {
		const bookChapter = await this.prisma.bookChapter.findUnique({
			where: { id },
		})

		if (!bookChapter) {
			return null
		}

		return this.mapDbBookChapterToOutBookChapter(bookChapter)
	}

	// @CatchDbError()
	async getBookChapters(bookId: number) {
		const bookChapters = await this.prisma.bookChapter.findMany({
			where: { book_id: bookId },
		})

		return bookChapters.map(this.mapDbBookChapterToOutBookChapter)
	}

	mapDbBookChapterToOutBookChapter(dbBook: BookChapter): BookChapterOutModel {
		return {
			id: dbBook.id,
			bookId: dbBook.book_id,
			name: dbBook.name,
			header: dbBook.header,
			content: dbBook.content,
			note: dbBook.note,
		}
	}
}
