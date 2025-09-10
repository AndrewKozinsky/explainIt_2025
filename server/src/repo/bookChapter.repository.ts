import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookChapterServiceModel } from '../models/bookChapter/bookChapter.service.model'

type BookChapterWithBook = Prisma.BookChapterGetPayload<{ include: { book: true } }>

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

		return this.mapDbBookChapterToServiceBook(newBookChapter)
	}

	@CatchDbError()
	async getBookChapterById(bookChapterId: number) {
		const bookChapter = await this.prisma.bookChapter.findUnique({
			where: { id: bookChapterId },
			include: { book: true },
		})

		if (!bookChapter) {
			return null
		}

		return this.mapDbBookChapterToServiceBook(bookChapter)
	}

	@CatchDbError()
	async getBookChapterByBookId(bookId: number) {
		const bookChapters = await this.prisma.bookChapter.findMany({
			where: { book_id: bookId },
			include: { book: true },
		})

		return bookChapters.map(this.mapDbBookChapterToServiceBook)
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

		if (!updatedBookChapter) {
			return null
		}

		return this.mapDbBookChapterToServiceBook(updatedBookChapter)
	}

	@CatchDbError()
	async deleteBookChapterById(bookChapterId: number) {
		await this.prisma.bookChapter.delete({
			where: { id: bookChapterId },
		})
	}

	mapDbBookChapterToServiceBook(dbBookChapter: BookChapterWithBook): BookChapterServiceModel {
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
