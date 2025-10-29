import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookOutModel } from '../models/book/book.out.model'

type BookWithChapters = Prisma.BookGetPayload<{ include: { BookChapter: true } }>

@Injectable()
export class BookQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getBookById(id: number) {
		const book = await this.prisma.book.findUnique({
			where: { id },
			include: {
				BookChapter: {
					orderBy: { created_at: 'asc' },
				},
			},
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
			include: { BookChapter: { orderBy: { created_at: 'asc' } } },
		})

		return books.map(this.mapDbBookToOutBook)
	}

	mapDbBookToOutBook(dbBook: BookWithChapters): BookOutModel {
		return {
			id: dbBook.id,
			author: dbBook.author,
			name: dbBook.name,
			note: dbBook.note,
			userId: dbBook.user_id,
			chapters: dbBook.BookChapter.map((chapter) => ({
				id: chapter.id,
				bookId: chapter.book_id,
				name: chapter.name,
				header: chapter.header,
				note: chapter.note,
			})),
		}
	}
}
