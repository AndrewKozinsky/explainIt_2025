import { Injectable } from '@nestjs/common'
import { Book } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookServiceModel } from '../models/book/book.service.model'

@Injectable()
export class BookRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createBook(dto: { userId: number; author?: string; name?: string; note?: string }) {
		const newBook = await this.prisma.book.create({
			data: {
				author: dto.author ?? null,
				name: dto.name ?? null,
				note: dto.note ?? null,
				user_id: dto.userId,
			},
		})

		return this.mapDbBookToServiceBook(newBook)
	}

	mapDbBookToServiceBook(dbBook: Book): BookServiceModel {
		return {
			id: dbBook.id,
			author: dbBook.author,
			name: dbBook.name,
			note: dbBook.note,
		}
	}
}
