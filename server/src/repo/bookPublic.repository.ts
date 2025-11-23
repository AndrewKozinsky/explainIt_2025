import { Injectable } from '@nestjs/common'
import { Book, Prisma } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookServiceModel } from '../models/book/book.service.model'
import { BookPublicServiceModel } from 'src/models/bookPublic/bookPublic.service.model'

type BookPublicWithChapters = Prisma.BookPublicGetPayload<{ include: { BookChapter: true } }>

@Injectable()
export class BookPublicRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createBookPublic(dto: { author: string; name: string; note: string; cover: string }) {
		const newBookPublic = await this.prisma.bookPublic.create({
			data: {
				author: dto.author,
				name: dto.name,
				note: dto.note,
				cover: dto.cover,
			},
			include: { BookChapter: true },
		})

		return this.mapDbBookPublicToServiceBook(newBookPublic)
	}

	@CatchDbError()
	async getBook(input: { id?: number; author?: string; name?: string }) {
		let book: BookPublicWithChapters | null = null

		if (typeof input.id === 'number') {
			book = await this.prisma.bookPublic.findUnique({
				where: { id: input.id },
				include: { BookChapter: true },
			})
		} else {
			const where: Prisma.BookPublicWhereInput = {}
			if (typeof input.author === 'string') where.author = input.author
			if (typeof input.name === 'string') where.name = input.name

			book = await this.prisma.bookPublic.findFirst({
				where,
				include: { BookChapter: true },
			})
		}

		if (!book) {
			return null
		}

		return this.mapDbBookPublicToServiceBook(book)
	}

	mapDbBookPublicToServiceBook(dbBook: BookPublicWithChapters): BookPublicServiceModel {
		return {
			id: dbBook.id,
			author: dbBook.author,
			name: dbBook.name,
			note: dbBook.note,
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
