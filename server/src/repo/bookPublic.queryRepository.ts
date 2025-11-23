import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookPublicOutModel } from 'src/models/bookPublic/bookPublic.out.model'

type BookPublicWithChapters = Prisma.BookPublicGetPayload<{ include: { BookChapter: true } }>

@Injectable()
export class BookPublicQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getPublicBooks() {
		const booksPublic = await this.prisma.bookPublic.findMany({
			include: { BookChapter: { orderBy: { created_at: 'asc' } } },
		})

		return booksPublic.map(this.mapDbBookPublicToOutBook)
	}

	@CatchDbError()
	async getPublicBookById(bookId: number) {
		const bookPublic = await this.prisma.bookPublic.findUnique({
			where: { id: bookId },
			include: { BookChapter: { orderBy: { created_at: 'asc' } } },
		})

		if (!bookPublic) return null

		return this.mapDbBookPublicToOutBook(bookPublic)
	}

	mapDbBookPublicToOutBook(dbBook: BookPublicWithChapters): BookPublicOutModel {
		return {
			id: dbBook.id,
			author: dbBook.author,
			name: dbBook.name,
			note: dbBook.note,
			cover: dbBook.cover,
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
