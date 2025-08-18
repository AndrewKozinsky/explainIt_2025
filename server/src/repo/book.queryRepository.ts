import { Injectable } from '@nestjs/common'
import { Book } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookOutModel } from '../models/book/book.out.model'

@Injectable()
export class BookQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getBookById(id: number) {
		const book = await this.prisma.book.findUnique({
			where: { id },
		})

		if (!book) {
			return null
		}

		return this.mapDbBookToOutBook(book)
	}

	@CatchDbError()
	async getUserBooks(userId: number) {
		const books = await this.prisma.book.findMany({
			where: { user_id: userId },
		})

		return books.map(this.mapDbBookToOutBook)
	}

	mapDbBookToOutBook(dbBook: Book): BookOutModel {
		// console.log(dbBook)
		return {
			id: dbBook.id,
			author: dbBook.author,
			name: dbBook.name,
			note: dbBook.note,
		}
	}
}
