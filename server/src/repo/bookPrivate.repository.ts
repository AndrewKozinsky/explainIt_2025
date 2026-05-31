import { Injectable } from '@nestjs/common'
import { Language } from 'utils/languages'
import { Prisma } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookServiceModel } from '../models/book/book.service.model'

type BookWithChapters = Prisma.BookPrivateGetPayload<{ include: { BookChapter: true } }>

@Injectable()
export class BookPrivateRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createBook(dto: {
		userId: number
		author?: null | string
		name?: null | string
		note?: null | string
		languageCode: Language
	}) {
		const newBook = await this.prisma.bookPrivate.create({
			data: {
				author: dto.author,
				name: dto.name,
				source_language_code: dto.languageCode,
				note: dto.note,
				user_id: dto.userId,
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
			note?: null | string
			fileName?: null | string
			fileS3Key?: null | string
			isFileUploaded?: boolean
		},
	) {
		const newBook = await this.prisma.bookPrivate.update({
			where: { id: bookId },
			data: {
				author: dto.author,
				name: dto.name,
				note: dto.note,
				...(dto.languageCode ? { source_language_code: dto.languageCode } : {}),
				file_name: dto.fileName,
				file_s3_key: dto.fileS3Key,
				s3_provider_name: dto.fileS3Key ? 'cloudRu' : null,
				is_file_uploaded: dto.isFileUploaded,
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
		await this.prisma.bookPrivate.delete({
			where: { id: bookId },
			include: { BookChapter: true },
		})
	}

	mapDbBookToServiceBook(dbBook: BookWithChapters): BookServiceModel {
		return {
			id: dbBook.id,
			author: dbBook.author,
			name: dbBook.name,
			sourceLanguageCode: dbBook.source_language_code,
			note: dbBook.note,
			userId: dbBook.user_id,
			fileName: dbBook.file_name,
			fileS3Key: dbBook.file_s3_key,
			isFileUploaded: dbBook.is_file_uploaded,
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
