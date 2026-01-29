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
