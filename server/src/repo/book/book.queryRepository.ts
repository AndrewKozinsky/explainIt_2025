import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import { CloudRuS3Service } from 'infrastructure/cloudRuS3/cloudRuS3.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { BookOutModel } from 'models/book/book.out.model'
import { Prisma } from 'prisma/generated/client'

type BookWithChapters = Prisma.BookGetPayload<{ include: { BookChapter: true } }>

@Injectable()
export class BookQueryRepository {
	constructor(
		private prisma: PrismaService,
		private cloudRuS3Service: CloudRuS3Service,
	) {}

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
			where: { user_id: userId, type: 'private' },
			include: { BookChapter: { orderBy: { created_at: 'asc' } } },
		})

		return Promise.all(books.map((book) => this.mapDbBookToOutBook(book)))
	}

	@CatchDbError()
	async getPublicBooks() {
		const books = await this.prisma.book.findMany({
			where: { type: 'public' },
			include: { BookChapter: { orderBy: { id: 'asc' } } },
		})

		console.log(Promise.all(books.map((book) => this.mapDbBookToOutBook(book))))

		return Promise.all(books.map((book) => this.mapDbBookToOutBook(book)))
	}

	@CatchDbError()
	async getPublicBookById(bookId: number) {
		const book = await this.prisma.book.findUnique({
			where: { id: bookId, type: 'public' },
			include: { BookChapter: { orderBy: { created_at: 'asc' } } },
		})

		if (!book) return null

		return this.mapDbBookToOutBook(book)
	}

	async mapDbBookToOutBook(dbBook: BookWithChapters): Promise<BookOutModel> {
		const coverUrl = dbBook.cover_file_s3_key
			? await this.cloudRuS3Service.getFileUrl(dbBook.cover_file_s3_key)
			: null

		return {
			id: dbBook.id,
			type: dbBook.type,
			author: dbBook.author,
			name: dbBook.name,
			about: dbBook.about,
			userId: dbBook.user_id,
			languageCode: dbBook.source_language_code,
			coverUrl,
			uploadUrl: null,
			coverFileName: dbBook.cover_file_name,
			coverFileS3Key: dbBook.cover_file_s3_key,
			isCoverFileUploaded: dbBook.is_cover_file_uploaded,
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
