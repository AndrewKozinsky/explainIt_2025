import { Injectable } from '@nestjs/common'
import { SentenceServiceModel } from 'models/sentence/sentence.service.model'
import { Prisma, Sentence } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

type DbSentenceWithRelations = Prisma.SentenceGetPayload<{
	include: {
		book_chapter: { include: { book: true; book_public: true } }
		video_private: true
	}
}>

@Injectable()
export class SentenceRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getSentenceDbById(id: number): Promise<DbSentenceWithRelations | null> {
		return await this.prisma.sentence.findUnique({
			where: { id },
			include: {
				book_chapter: { include: { book: true, book_public: true } },
				video_private: true,
			},
		})
	}

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

	mapDbBookToServiceBook(dbSentence: Sentence): SentenceServiceModel {
		return {
			id: dbSentence.id,
			startOffset: dbSentence.start_offset,
			length: dbSentence.length,
		}
	}
}
