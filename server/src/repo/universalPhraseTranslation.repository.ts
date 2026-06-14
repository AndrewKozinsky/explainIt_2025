import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import {
	UniversalPhraseTranslationData,
	UniversalPhraseTranslationServiceModel,
} from 'models/universalPhraseTranslation/universalPhraseTranslation.service.model'
import { LanguageCode, UniversalPhraseTranslation } from 'prisma/generated/client'

@Injectable()
export class UniversalPhraseTranslationRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async findByPhraseIdAndTargetLang(
		universalPhraseId: number,
		targetLanguageCode: LanguageCode,
	): Promise<UniversalPhraseTranslationServiceModel | null> {
		const db = await this.prisma.universalPhraseTranslation.findUnique({
			where: {
				universal_phrase_id_target_language_code: {
					universal_phrase_id: universalPhraseId,
					target_language_code: targetLanguageCode,
				},
			},
		})

		if (!db) return null
		return this.mapDbToService(db)
	}

	@CatchDbError()
	async createPending(input: {
		universalPhraseId: number
		targetLanguageCode: LanguageCode
	}): Promise<UniversalPhraseTranslationServiceModel> {
		const db = await this.prisma.universalPhraseTranslation.create({
			data: {
				universal_phrase_id: input.universalPhraseId,
				target_language_code: input.targetLanguageCode,
				translation: null,
				status: 'pending',
				error_message: null,
				non_existent_word: false,
			},
		})

		return this.mapDbToService(db)
	}

	@CatchDbError()
	async updateToReady(
		id: number,
		translation: UniversalPhraseTranslationData,
	): Promise<UniversalPhraseTranslationServiceModel> {
		const db = await this.prisma.universalPhraseTranslation.update({
			where: { id },
			data: {
				translation: JSON.stringify(translation),
				status: 'ready',
				error_message: null,
				non_existent_word: false,
			},
		})

		return this.mapDbToService(db)
	}

	@CatchDbError()
	async updateToNonExistentWord(id: number): Promise<UniversalPhraseTranslationServiceModel> {
		const db = await this.prisma.universalPhraseTranslation.update({
			where: { id },
			data: {
				translation: null,
				status: 'ready',
				error_message: null,
				non_existent_word: true,
			},
		})

		return this.mapDbToService(db)
	}

	@CatchDbError()
	async updateToError(id: number, errorMessage: string): Promise<UniversalPhraseTranslationServiceModel> {
		const db = await this.prisma.universalPhraseTranslation.update({
			where: { id },
			data: {
				status: 'error',
				error_message: errorMessage,
			},
		})

		return this.mapDbToService(db)
	}

	private mapDbToService(db: UniversalPhraseTranslation): UniversalPhraseTranslationServiceModel {
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
			createdAt: db.created_at,
		}
	}
}
