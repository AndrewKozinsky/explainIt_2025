import { Injectable } from '@nestjs/common'
import { Prisma, SentenceTranslation } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

type DbSentenceTranslationWithSentence = Prisma.SentenceTranslationGetPayload<{
	include: {
		sentence: {
			include: {
				bookChapter: { include: { book: true; book_public: true } }
				videoPrivate: true
			}
		}
	}
}>

@Injectable()
export class SentenceTranslationRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getSentenceTranslationDbById(id: number): Promise<DbSentenceTranslationWithSentence | null> {
		return await this.prisma.sentenceTranslation.findUnique({
			where: { id },
			include: {
				sentence: {
					include: {
						bookChapter: { include: { book: true, book_public: true } },
						videoPrivate: true,
					},
				},
			},
		})
	}

	@CatchDbError()
	async getFirstSentenceTranslationBySentenceId(sentenceId: number) {
		const sentenceTranslation = await this.prisma.sentenceTranslation.findFirst({
			where: { sentence_id: sentenceId },
			orderBy: { created_at: 'asc' },
		})
		if (!sentenceTranslation) return null

		return this.mapDbSentenceTranslationToServiceSentenceTranslation(sentenceTranslation)
	}

	@CatchDbError()
	async createSentenceTranslation(dto: { sentenceId: number; translation: string; analysis?: null | string }) {
		const newSentenceTranslation = await this.prisma.sentenceTranslation.create({
			data: {
				sentence_id: dto.sentenceId,
				translation: dto.translation,
				analysis: dto.analysis ?? null,
			},
		})

		return this.mapDbSentenceTranslationToServiceSentenceTranslation(newSentenceTranslation)
	}

	@CatchDbError()
	async updateSentenceTranslationById(
		id: number,
		dto: {
			translation?: string
			analysis?: null | string
		},
	) {
		const data: Prisma.SentenceTranslationUpdateInput = {}
		if (typeof dto.translation === 'string') data.translation = dto.translation
		if (dto.analysis !== undefined) data.analysis = dto.analysis

		const updatedSentenceTranslation = await this.prisma.sentenceTranslation.update({
			where: { id },
			data,
		})

		return this.mapDbSentenceTranslationToServiceSentenceTranslation(updatedSentenceTranslation)
	}

	@CatchDbError()
	async deleteSentenceTranslationById(id: number) {
		await this.prisma.sentenceTranslation.delete({
			where: { id },
		})
	}

	mapDbSentenceTranslationToServiceSentenceTranslation(dbSentenceTranslation: SentenceTranslation) {
		return {
			id: dbSentenceTranslation.id,
			sentenceId: dbSentenceTranslation.sentence_id,
			translation: dbSentenceTranslation.translation,
			analysis: dbSentenceTranslation.analysis,
			createdAt: dbSentenceTranslation.created_at,
		}
	}
}
