import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import { UniversalPhraseTranslationOutModel } from 'models/universalPhraseTranslation/universalPhraseTranslation.out.model'
import { UniversalPhraseTranslationData } from 'models/universalPhraseTranslation/universalPhraseTranslation.service.model'
import { UniversalPhraseTranslation } from 'prisma/generated/client'

@Injectable()
export class UniversalPhraseTranslationQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getById(id: number): Promise<null | UniversalPhraseTranslationOutModel> {
		const db = await this.prisma.universalPhraseTranslation.findUnique({
			where: { id },
		})
		if (!db) return null

		return this.mapDbToOut(db)
	}

	private mapDbToOut(db: UniversalPhraseTranslation): UniversalPhraseTranslationOutModel {
		let translation: null | UniversalPhraseTranslationData = null

		if (db.translation) {
			translation = JSON.parse(db.translation) as UniversalPhraseTranslationData
		}

		return {
			id: db.id,
			universalPhraseId: db.universal_phrase_id,
			targetLanguageCode: db.target_language_code,
			translation,
			status: db.status,
			errorMessage: db.error_message,
			nonExistentWord: db.non_existent_word,
			createdAt: db.created_at.toISOString(),
		}
	}
}
