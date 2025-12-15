import { Injectable } from '@nestjs/common'
import { Prisma } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookChapterServiceModel } from '../models/bookChapter/bookChapter.service.model'

type BookChapterWithBook = Prisma.BookChapterGetPayload<{ include: { book: true; book_public: true } }>

type BookChapterWithBookNotNull = Omit<BookChapterWithBook, 'book' | 'book_public'> & {
	book: NonNullable<BookChapterWithBook['book']>
	book_public: NonNullable<BookChapterWithBook['book_public']>
}

@Injectable()
export class BookChapterRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createBookChapter(dto: {
		bookType: 'public' | 'private'
		bookId: number
		name?: null | string
		header?: null | string
		content?: null | string
		note?: null | string
	}) {
		const newBookChapter = await this.prisma.bookChapter.create({
			data: {
				book_id: dto.bookType === 'public' ? null : dto.bookId,
				book_public_id: dto.bookType === 'public' ? dto.bookId : null,
				name: dto.name,
				header: dto.header,
				content: dto.content,
				note: dto.note,
			},
			include: {
				book: true,
				book_public: true,
			},
		})

		return this.mapDbBookChapterToServiceBook(dto.bookType, newBookChapter as BookChapterWithBookNotNull)
	}

	@CatchDbError()
	async getBookChapter(input: {
		bookType: 'public' | 'private'
		id?: number
		bookId?: number
		name?: null | string
	}) {
		const where: Prisma.BookChapterWhereInput = {}
		if (input.id) where.id = input.id
		if (input.name) where.name = input.name

		if (!input.id && input.bookId) {
			const bookKey = input.bookType === 'public' ? 'book_public_id' : 'book_id'
			where[bookKey] = input.bookId
		}

		if (Object.keys(where).length === 0) {
			return null
		}

		const bookChapter = await this.prisma.bookChapter.findFirst({
			where,
			include: { book: true, book_public: true },
		})

		if (!bookChapter) return null

		if (input.bookType === 'public' && !bookChapter.book_public) {
			return null
		} else if (input.bookType !== 'public' && !bookChapter.book) {
			return null
		}

		return this.mapDbBookChapterToServiceBook(input.bookType, bookChapter as BookChapterWithBookNotNull)
	}

	@CatchDbError()
	async getBookChapterByBookId(bookId: number) {
		const bookChapters = await this.prisma.bookChapter.findMany({
			where: { book_id: bookId },
			include: { book: true, book_public: true },
		})

		return bookChapters.map((ch) => this.mapDbBookChapterToServiceBook('private', ch as BookChapterWithBookNotNull))
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
			include: { book: true, book_public: true },
		})

		if (!updatedBookChapter || !updatedBookChapter.book) {
			return null
		}

		return this.mapDbBookChapterToServiceBook('private', updatedBookChapter as BookChapterWithBookNotNull)
	}

	@CatchDbError()
	async deleteBookChapterById(bookChapterId: number) {
		await this.prisma.bookChapter.delete({
			where: { id: bookChapterId },
		})
	}

	mapDbBookChapterToServiceBook(
		bookType: 'public' | 'private',
		dbBookChapter: BookChapterWithBookNotNull,
	): BookChapterServiceModel {
		const book = bookType === 'public' ? dbBookChapter.book_public : dbBookChapter.book

		return {
			id: dbBookChapter.id,
			header: dbBookChapter.header,
			name: dbBookChapter.name,
			content: dbBookChapter.content,
			note: dbBookChapter.note,
			book: {
				id: book.id,
				name: book.name,
				author: book.author,
				note: book.note,
				userId: bookType === 'public' ? null : dbBookChapter.book.user_id,
			},
		}
	}
}
