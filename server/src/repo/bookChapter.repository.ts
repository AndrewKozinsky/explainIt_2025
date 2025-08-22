import { Injectable } from '@nestjs/common'
import { BookChapter } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookServiceModel } from '../models/book/book.service.model'
import { BookChapterServiceModel } from '../models/bookChapter/bookChapter.service.model'

@Injectable()
export class BookChapterRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createBookChapter(dto: {
		bookId: number
		name: null | string
		header: null | string
		content: null | string
		note: null | string
	}) {
		const newBookChapter = await this.prisma.bookChapter.create({
			data: {
				book_id: dto.bookId,
				name: dto.name,
				content: dto.content,
				note: dto.note,
			},
		})

		return this.mapDbBookChapterToServiceBook(newBookChapter)
	}

	/*@CatchDbError()
	async getBookChapterById(bookId: number) {
		const book = await this.prisma.book.findUnique({
			where: { id: bookId },
		})

		if (!book) {
			return null
		}

		return this.mapDbBookToServiceBook(book)
	}*/

	/*@CatchDbError()
	async updateBookChapterById(
		bookId: number,
		dto: {
			author?: null | string
			name?: null | string
			note?: null | string
		},
	) {
		const newBook = await this.prisma.book.update({
			where: { id: bookId },
			data: {
				author: dto.author,
				name: dto.name,
				note: dto.note,
			},
		})

		if (!newBook) {
			return null
		}

		return this.mapDbBookToServiceBook(newBook)
	}*/

	mapDbBookChapterToServiceBook(dbBookChapter: BookChapter): BookChapterServiceModel {
		return {
			id: dbBookChapter.id,
			bookId: dbBookChapter.book_id,
			header: dbBookChapter.header,
			name: dbBookChapter.name,
			content: dbBookChapter.content,
			note: dbBookChapter.note,
		}
	}
}
