import { Injectable } from '@nestjs/common'
import { SentenceTranslationOutModel } from 'models/sentenceTranslation/sentenceTranslation.out.model'
import { SentenceTranslation } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class SentenceTranslationQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getSentenceTranslationById(id: number): Promise<SentenceTranslationOutModel | null> {
		const sentenceTranslation = await this.prisma.sentenceTranslation.findUnique({
			where: { id },
		})

		if (!sentenceTranslation) return null

		return this.mapDbSentenceTranslationToOutModel(sentenceTranslation)
	}

	@CatchDbError()
	async getSentenceTranslationsBySentenceId(sentenceId: number): Promise<SentenceTranslationOutModel[]> {
		const sentenceTranslations = await this.prisma.sentenceTranslation.findMany({
			where: { sentence_id: sentenceId },
			orderBy: { created_at: 'asc' },
		})

		return sentenceTranslations.map((t) => this.mapDbSentenceTranslationToOutModel(t))
	}

	mapDbSentenceTranslationToOutModel(db: SentenceTranslation): SentenceTranslationOutModel {
		return {
			id: db.id,
			sentenceId: db.sentence_id,
			provider: db.provider,
			translation: db.translation,
			analysis: db.analysis ?? null,
			createdAt: db.created_at.toISOString(),
		}
	}
}
