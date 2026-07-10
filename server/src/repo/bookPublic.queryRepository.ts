import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { BookPublicOutModel } from 'models/bookPublic/bookPublic.out.model'
import { Prisma } from 'prisma/generated/client'

type BookPublicWithChapters = Prisma.BookPublicGetPayload<{ include: { BookChapter: true } }>

@Injectable()
export class BookPublicQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getPublicBooks() {
		const booksPublic = await this.prisma.bookPublic.findMany({
			include: { BookChapter: { orderBy: { id: 'asc' } } },
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
			covers: dbBook.covers,
			languageCode: dbBook.source_language_code,
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
