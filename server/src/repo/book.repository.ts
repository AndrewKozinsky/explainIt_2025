import { Injectable } from '@nestjs/common'
import { Book } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookServiceModel } from '../models/book/book.service.model'

@Injectable()
export class BookRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createBook(dto: { userId: number; author: null | string; name: null | string; note: null | string }) {
		const newBook = await this.prisma.book.create({
			data: {
				author: dto.author,
				name: dto.name,
				note: dto.note,
				user_id: dto.userId,
			},
		})

		return this.mapDbBookToServiceBook(newBook)
	}

	@CatchDbError()
	async getBookById(bookId: number) {
		const book = await this.prisma.book.findUnique({
			where: { id: bookId },
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
		})

		if (!newBook) {
			return null
		}

		console.log(newBook)

		return this.mapDbBookToServiceBook(newBook)
	}

	mapDbBookToServiceBook(dbBook: Book): BookServiceModel {
		return {
			id: dbBook.id,
			author: dbBook.author,
			name: dbBook.name,
			note: dbBook.note,
		}
	}
}
