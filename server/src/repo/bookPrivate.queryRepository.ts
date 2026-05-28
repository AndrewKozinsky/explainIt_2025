import { Injectable } from '@nestjs/common'
import { Prisma } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import { CloudRuS3Service } from '../infrastructure/cloudRuS3/cloudRuS3.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookPrivateOutModel } from '../models/book/book.out.model'

type BookWithChapters = Prisma.BookPrivateGetPayload<{ include: { BookChapter: true } }>

@Injectable()
export class BookPrivateQueryRepository {
	constructor(
		private prisma: PrismaService,
		private cloudRuS3Service: CloudRuS3Service,
	) {}

	@CatchDbError()
	async getBookById(id: number) {
		const book = await this.prisma.bookPrivate.findUnique({
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
		const books = await this.prisma.bookPrivate.findMany({
			where: { user_id: userId },
			include: { BookChapter: { orderBy: { created_at: 'asc' } } },
		})

		return Promise.all(books.map((book) => this.mapDbBookToOutBook(book)))
	}

	async mapDbBookToOutBook(dbBook: BookWithChapters): Promise<BookPrivateOutModel> {
		const coverUrl = dbBook.file_s3_key ? await this.cloudRuS3Service.getFileUrl(dbBook.file_s3_key) : null

		return {
			id: dbBook.id,
			author: dbBook.author,
			name: dbBook.name,
			note: dbBook.note,
			userId: dbBook.user_id,
			freeToUse: false,
			languageCode: dbBook.source_language_code,
			coverUrl,
			uploadUrl: null,
			fileName: dbBook.file_name,
			fileS3Key: dbBook.file_s3_key,
			isFileUploaded: dbBook.is_file_uploaded,
			chapters: dbBook.BookChapter.map((chapter) => {
				return {
					id: chapter.id,
					bookId: dbBook.id,
					name: chapter.name,
					header: chapter.header,
					note: chapter.note,
				}
			}),
		}
	}
}
