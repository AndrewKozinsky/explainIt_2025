import { Injectable } from '@nestjs/common'
import { Book } from '@prisma/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'
import { BookServiceModel } from '../models/book/book.service.model'

@Injectable()
export class BookRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createBook(dto: { userId: number; author: null | string; name: null | string; note: null | string }) {
		const newBook = await this.prisma.book.create({
			data: {
				author: dto.author,
				name: dto.name,
				note: dto.note ?? null,
				// note: null,
				user_id: dto.userId,
			},
		})
		// console.log('------')
		// console.log(newBook)

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
