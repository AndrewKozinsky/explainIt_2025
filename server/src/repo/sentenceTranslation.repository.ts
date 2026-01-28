import { Injectable } from '@nestjs/common'
import { SentenceTranslation, SentenceTranslationProvider } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class SentenceTranslationRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createSentenceTranslation(dto: {
		sentenceId: number
		provider: SentenceTranslationProvider
		translation: string
		analysis?: null | string
	}) {
		const newSentenceTranslation = await this.prisma.sentenceTranslation.create({
			data: {
				sentence_id: dto.sentenceId,
				provider: dto.provider,
				translation: dto.translation,
				analysis: dto.analysis ?? null,
			},
		})

		return this.mapDbSentenceTranslationToServiceSentenceTranslation(newSentenceTranslation)
	}

	mapDbSentenceTranslationToServiceSentenceTranslation(dbSentenceTranslation: SentenceTranslation) {
		return {
			id: dbSentenceTranslation.id,
			sentenceId: dbSentenceTranslation.sentence_id,
			provider: dbSentenceTranslation.provider,
			translation: dbSentenceTranslation.translation,
			analysis: dbSentenceTranslation.analysis,
			createdAt: dbSentenceTranslation.created_at,
		}
	}
}
