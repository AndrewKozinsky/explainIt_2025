import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { BookChapterServiceModel } from 'models/bookChapter/bookChapter.service.model'
import { Prisma } from 'prisma/generated/client'

type BookChapterWithBookAndSentences = Prisma.BookChapterGetPayload<{
	include: { book: true; Sentence: true }
}>

type BookChapterWithBookNotNull = Omit<BookChapterWithBookAndSentences, 'book'> & {
	book: NonNullable<BookChapterWithBookAndSentences['book']>
	Sentence: NonNullable<BookChapterWithBookAndSentences['Sentence']>
}

@Injectable()
export class BookChapterRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createBookChapter(dto: {
		bookId: number
		name?: null | string
		header?: null | string
		originalContent?: null | string
		processedContent?: null | string
		note?: null | string
	}) {
		const newBookChapter = await this.prisma.bookChapter.create({
			data: {
				book_id: dto.bookId,
				name: dto.name,
				header: dto.header,
				original_content: dto.originalContent,
				processed_content: dto.processedContent,
				note: dto.note,
			},
			include: {
				book: true,
				Sentence: {
					orderBy: { order_index: 'asc' },
				},
			},
		})

		return this.mapDbBookChapterToServiceBook(newBookChapter as BookChapterWithBookNotNull)
	}

	@CatchDbError()
	async getBookChapter(input: { id?: number; bookId?: number; name?: null | string; header?: null | string }) {
		const where: Prisma.BookChapterWhereInput = {}
		if (input.id) where.id = input.id
		if (input.name) where.name = input.name
		if (input.header) where.header = input.header
		if (!input.id && input.bookId) {
			where.book_id = input.bookId
		}

		if (Object.keys(where).length === 0) {
			return null
		}

		const bookChapter = await this.prisma.bookChapter.findFirst({
			where,
			include: {
				book: true,
				Sentence: {
					orderBy: { order_index: 'asc' },
				},
			},
		})

		if (!bookChapter || !bookChapter.book) return null

		return this.mapDbBookChapterToServiceBook(bookChapter as BookChapterWithBookNotNull)
	}

	@CatchDbError()
	async updateBookChapterById(
		bookChapterId: number,
		dto: {
			name?: null | string
			header?: null | string
			originalContent?: null | string
			processedContent?: null | string
			note?: null | string
		},
	) {
		const updatedBookChapter = await this.prisma.bookChapter.update({
			where: { id: bookChapterId },
			data: {
				name: dto.name,
				header: dto.header,
				original_content: dto.originalContent,
				processed_content: dto.processedContent,
				note: dto.note,
			},
			include: { book: true, Sentence: true },
		})

		if (!updatedBookChapter || !updatedBookChapter.book) {
			return null
		}

		return this.mapDbBookChapterToServiceBook(updatedBookChapter as BookChapterWithBookNotNull)
	}

	@CatchDbError()
	async deleteBookChapterById(bookChapterId: number) {
		await this.prisma.bookChapter.delete({
			where: { id: bookChapterId },
		})
	}

	mapDbBookChapterToServiceBook(dbBookChapter: BookChapterWithBookNotNull): BookChapterServiceModel {
		const book = dbBookChapter.book

		return {
			id: dbBookChapter.id,
			header: dbBookChapter.header,
			name: dbBookChapter.name,
			note: dbBookChapter.note,
			originalContent: dbBookChapter.original_content,
			processedContent: dbBookChapter.original_content,
			sentences: dbBookChapter.Sentence.map((s) => {
				return {
					id: s.id,
					startOffset: s.start_offset,
					length: s.length,
				}
			}),
			book: {
				id: book.id,
				name: book.name,
				author: book.author,
				languageCode: book.source_language_code,
				about: book.about,
				userId: book.user_id,
			},
		}
	}
}
