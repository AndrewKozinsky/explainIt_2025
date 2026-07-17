import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { SentenceServiceModel } from 'models/sentence/sentence.service.model'
import { Prisma, Sentence } from 'prisma/generated/client'

type DbSentenceWithRelations = Prisma.SentenceGetPayload<{
	include: {
		bookChapter: { include: { book: true } }
		video: { include: { video_collection: true } }
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
				bookChapter: { include: { book: true } },
				video: { include: { video_collection: true } },
			},
		})
	}

	@CatchDbError()
	async createSentence(dto: {
		startOffset: number
		length: number
		bookChapterId?: number
		videoId?: number
		orderIndex: number
	}) {
		const newSentence = await this.prisma.sentence.create({
			data: {
				start_offset: dto.startOffset,
				length: dto.length,
				book_chapter_id: dto.bookChapterId,
				video_id: dto.videoId,
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
	async deleteByVideoId(videoId: number): Promise<number> {
		const res = await this.prisma.sentence.deleteMany({
			where: { video_id: videoId },
		})

		return res.count
	}

	@CatchDbError()
	async getNeighborSentences(input: {
		sentenceId: number
		orderIndex: number
		bookChapterId: null | number
		videoId: null | number
		beforeSentences: number
		afterSentences: number
	}) {
		const parentFilter: {
			book_chapter_id?: number
			video_id?: number
		} = {}

		if (input.bookChapterId !== null) parentFilter.book_chapter_id = input.bookChapterId
		else if (input.videoId !== null) parentFilter.video_id = input.videoId

		return this.prisma.sentence.findMany({
			where: {
				...parentFilter,
				id: { not: input.sentenceId },
				order_index: {
					gte: input.orderIndex - input.beforeSentences,
					lte: input.orderIndex + input.afterSentences,
				},
			},
			orderBy: { order_index: 'asc' },
			select: {
				id: true,
				order_index: true,
				start_offset: true,
				length: true,
			},
		})
	}

	mapDbBookToServiceBook(dbSentence: Sentence): SentenceServiceModel {
		return {
			id: dbSentence.id,
			startOffset: dbSentence.start_offset,
			length: dbSentence.length,
		}
	}
}
