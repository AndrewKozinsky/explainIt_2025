import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookChapterServiceModel } from '../models/bookChapter/bookChapter.service.model'

type BookChapterWithBook = Prisma.BookChapterGetPayload<{ include: { book: true } }>

type BookChapterWithBookPrivate = Omit<BookChapterWithBook, 'book'> & {
	book: NonNullable<BookChapterWithBook['book']>
}

@Injectable()
export class BookChapterRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createBookChapter(dto: {
		bookId: number
		name?: null | string
		header?: null | string
		content?: null | string
		note?: null | string
	}) {
		const newBookChapter = await this.prisma.bookChapter.create({
			data: {
				book_id: dto.bookId,
				name: dto.name,
				header: dto.header,
				content: dto.content,
				note: dto.note,
			},
			include: {
				book: true,
			},
		})

		return this.mapDbBookChapterToServiceBook(newBookChapter as BookChapterWithBookPrivate)
	}

	@CatchDbError()
	async getBookChapter(input: { id?: number; bookId?: number; name?: null | string }) {
		const where: Prisma.BookChapterWhereInput = {}
		if (typeof input.id === 'number') where.id = input.id
		if (typeof input.bookId === 'number') where.book_id = input.bookId
		if (typeof input.name === 'string') where.name = input.name

		if (Object.keys(where).length === 0) {
			return null
		}

		const bookChapter = await this.prisma.bookChapter.findFirst({
			where,
			include: { book: true },
		})

		if (!bookChapter || !bookChapter.book) {
			return null
		}

		return this.mapDbBookChapterToServiceBook(bookChapter as BookChapterWithBookPrivate)
	}

	@CatchDbError()
	async getBookChapterByBookId(bookId: number) {
		const bookChapters = await this.prisma.bookChapter.findMany({
			where: { book_id: bookId },
			include: { book: true },
		})

		return bookChapters.map((ch) => this.mapDbBookChapterToServiceBook(ch as BookChapterWithBookPrivate))
	}

	@CatchDbError()
	async updateBookChapterById(
		bookChapterId: number,
		dto: {
			name?: null | string
			header?: null | string
			content?: null | string
			note?: null | string
		},
	) {
		const updatedBookChapter = await this.prisma.bookChapter.update({
			where: { id: bookChapterId },
			data: {
				name: dto.name,
				header: dto.header,
				content: dto.content,
				note: dto.note,
			},
			include: { book: true },
		})

		if (!updatedBookChapter || !updatedBookChapter.book) {
			return null
		}

		return this.mapDbBookChapterToServiceBook(updatedBookChapter as BookChapterWithBookPrivate)
	}

	@CatchDbError()
	async deleteBookChapterById(bookChapterId: number) {
		await this.prisma.bookChapter.delete({
			where: { id: bookChapterId },
		})
	}

	mapDbBookChapterToServiceBook(dbBookChapter: BookChapterWithBookPrivate): BookChapterServiceModel {
		return {
			id: dbBookChapter.id,
			header: dbBookChapter.header,
			name: dbBookChapter.name,
			content: dbBookChapter.content,
			note: dbBookChapter.note,
			book: {
				id: dbBookChapter.book.id,
				name: dbBookChapter.book.name,
				author: dbBookChapter.book.author,
				note: dbBookChapter.book.note,
				userId: dbBookChapter.book.user_id,
			},
		}
	}
}
