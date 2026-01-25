import { Injectable } from '@nestjs/common'
import { SentenceServiceModel } from 'models/sentence/sentence.service.model'
import { Sentence } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class SentenceRepository {
	constructor(private prisma: PrismaService) {}
	@CatchDbError()
	async createSentence(dto: {
		startOffset: number
		length: number
		bookChapterId?: number
		videoPrivateId?: number
		orderIndex: number
	}) {
		const newSentence = await this.prisma.sentence.create({
			data: {
				start_offset: dto.startOffset,
				length: dto.length,
				book_chapter_id: dto.bookChapterId,
				video_private_id: dto.videoPrivateId,
				order_index: dto.orderIndex,
			},
		})

		return this.mapDbBookToServiceBook(newSentence)
	}

	@CatchDbError()
	async deleteByBookChapterId(bookChapterId: number): Promise<number> {
		const res = await this.prisma.sentence.deleteMany({
			where: { book_chapter_id: bookChapterId },
		})
		return res.count
	}

	@CatchDbError()
	async deleteByVideoPrivateId(videoPrivateId: number): Promise<number> {
		const res = await this.prisma.sentence.deleteMany({
			where: { video_private_id: videoPrivateId },
		})
		return res.count
	}

	mapDbBookToServiceBook(dbBook: Sentence): SentenceServiceModel {
		return {
			id: dbBook.id,
			startOffset: dbBook.start_offset,
			length: dbBook.length,
		}
	}
}
