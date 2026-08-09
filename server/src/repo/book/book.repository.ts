import { Injectable } from '@nestjs/common'
import { Language } from 'utils/languages'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { BookServiceModel } from 'models/book/book.service.model'
import { Prisma } from 'prisma/generated/client'

type BookWithChapters = Prisma.BookGetPayload<{ include: { BookChapter: true } }>

@Injectable()
export class BookRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createBook(dto: {
		type: 'public' | 'private'
		userId?: null | number
		author?: null | string
		name?: null | string
		about?: null | string
		languageCode: Language
		coverFileName?: null | string
		coverFileS3Key?: null | string
	}) {
		const newBook = await this.prisma.book.create({
			data: {
				type: dto.type,
				author: dto.author,
				name: dto.name,
				source_language_code: dto.languageCode,
				about: dto.about,
				user_id: dto.userId ?? null,
				cover_file_name: dto.coverFileName,
				cover_file_s3_key: dto.coverFileS3Key,
				cover_file_s3_provider_name: dto.coverFileS3Key ? 'cloudRu' : null,
			},
			include: { BookChapter: true },
		})

		return this.mapDbBookToServiceBook(newBook)
	}

	@CatchDbError()
	async updateBookById(
		bookId: number,
		dto: {
			author?: null | string
			name?: null | string
			languageCode?: null | Language
			about?: null | string
			coverFileName?: null | string
			coverFileS3Key?: null | string
			isCoverFileUploaded?: boolean
		},
	) {
		const newBook = await this.prisma.book.update({
			where: { id: bookId },
			data: {
				author: dto.author,
				name: dto.name,
				about: dto.about,
				...(dto.languageCode ? { source_language_code: dto.languageCode } : {}),
				cover_file_name: dto.coverFileName,
				cover_file_s3_key: dto.coverFileS3Key,
				cover_file_s3_provider_name: dto.coverFileS3Key ? 'cloudRu' : null,
				is_cover_file_uploaded: dto.isCoverFileUploaded,
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

	@CatchDbError()
	async getBook(input: { id?: number; author?: string; name?: string }) {
		let book: BookWithChapters | null = null

		if (typeof input.id === 'number') {
			book = await this.prisma.book.findUnique({
				where: { id: input.id },
				include: { BookChapter: { orderBy: { created_at: 'asc' } } },
			})
		} else {
			const where: Prisma.BookWhereInput = {}
			if (typeof input.author === 'string') where.author = input.author
			if (typeof input.name === 'string') where.name = input.name

			book = await this.prisma.book.findFirst({
				where,
				include: { BookChapter: { orderBy: { created_at: 'asc' } } },
			})
		}

		if (!book) {
			return null
		}

		return this.mapDbBookToServiceBook(book)
	}

	mapDbBookToServiceBook(dbBook: BookWithChapters): BookServiceModel {
		return {
			id: dbBook.id,
			type: dbBook.type,
			author: dbBook.author,
			name: dbBook.name,
			sourceLanguageCode: dbBook.source_language_code,
			about: dbBook.about,
			userId: dbBook.user_id,
			coverFileName: dbBook.cover_file_name,
			coverFileS3Key: dbBook.cover_file_s3_key,
			isCoverFileUploaded: dbBook.is_cover_file_uploaded,
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
