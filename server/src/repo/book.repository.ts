import { Injectable } from '@nestjs/common'
import { Book, Prisma } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookServiceModel } from '../models/book/book.service.model'

type BookWithChapters = Prisma.BookGetPayload<{ include: { BookChapter: true } }>

@Injectable()
export class BookRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createBook(dto: { userId: number; author?: null | string; name?: null | string; note?: null | string }) {
		const newBook = await this.prisma.book.create({
			data: {
				author: dto.author,
				name: dto.name,
				note: dto.note,
				user_id: dto.userId,
			},
			include: { BookChapter: true },
		})

		return this.mapDbBookToServiceBook(newBook)
	}

	@CatchDbError()
	async getBookById(bookId: number) {
		const book = await this.prisma.book.findUnique({
			where: { id: bookId },
			include: { BookChapter: true },
		})

		if (!book) {
			return null
		}

		return this.mapDbBookToServiceBook(book)
	}

	@CatchDbError()
	async updateBookById(
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
			include: { BookChapter: true },
		})

		if (!newBook) {
			return null
		}

		return this.mapDbBookToServiceBook(newBook)
	}

	@CatchDbError()
	async deleteBookById(bookId: number) {
		await this.prisma.book.delete({
			where: { id: bookId },
			include: { BookChapter: true },
		})
	}

	mapDbBookToServiceBook(dbBook: BookWithChapters): BookServiceModel {
		return {
			id: dbBook.id,
			author: dbBook.author,
			name: dbBook.name,
			note: dbBook.note,
			userId: dbBook.user_id,
			chapters: dbBook.BookChapter.map((chapter) => ({
				id: chapter.id,
				bookId: dbBook.id,
				name: chapter.name,
				header: chapter.header,
				note: chapter.note,
			})),
		}
	}
}
