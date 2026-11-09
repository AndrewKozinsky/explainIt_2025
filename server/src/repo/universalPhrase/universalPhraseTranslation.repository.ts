import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import {
	TranslationBlock,
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
				error_code: null,
				non_existent_word: false,
			},
		})

		return this.mapDbToService(db)
	}

	@CatchDbError()
	async updateToReady(
		id: number,
		translation: TranslationBlock[],
		lemmas: string[],
	): Promise<UniversalPhraseTranslationServiceModel> {
		const db = await this.prisma.universalPhraseTranslation.update({
			where: { id },
			data: {
				translation: JSON.stringify(translation),
				lemmas: JSON.stringify(lemmas),
				status: 'ready',
				error_code: null,
				non_existent_word: false,
			},
		})

		return this.mapDbToService(db)
	}

	/** Данные для фоновой генерации глубоких разделов. */
	@CatchDbError()
	async findForDeepSections(id: number): Promise<null | {
		phraseText: string
		sourceLanguageCode: LanguageCode
		targetLanguageCode: LanguageCode
		translation: string | null
		deepSections: string | null
	}> {
		const db = await this.prisma.universalPhraseTranslation.findUnique({
			where: { id },
			include: { universal_phrase: true },
		})
		if (!db) return null

		return {
			phraseText: db.universal_phrase.text,
			sourceLanguageCode: db.universal_phrase.source_language_code,
			targetLanguageCode: db.target_language_code,
			translation: db.translation,
			deepSections: db.deep_sections,
		}
	}

	@CatchDbError()
	async saveDeepSections(id: number, deepSections: TranslationBlock[]): Promise<void> {
		await this.prisma.universalPhraseTranslation.update({
			where: { id },
			data: { deep_sections: JSON.stringify(deepSections) },
		})
	}

	@CatchDbError()
	async updateToNonExistentWord(id: number): Promise<UniversalPhraseTranslationServiceModel> {
		const db = await this.prisma.universalPhraseTranslation.update({
			where: { id },
			data: {
				translation: null,
				status: 'ready',
				error_code: null,
				non_existent_word: true,
			},
		})

		return this.mapDbToService(db)
	}

	@CatchDbError()
	async updateToError(id: number, errorCode: string): Promise<UniversalPhraseTranslationServiceModel> {
		const db = await this.prisma.universalPhraseTranslation.update({
			where: { id },
			data: {
				status: 'error',
				error_code: errorCode,
			},
		})

		return this.mapDbToService(db)
	}

	private mapDbToService(db: UniversalPhraseTranslation): UniversalPhraseTranslationServiceModel {
		return {
			id: db.id,
			universalPhraseId: db.universal_phrase_id,
			targetLanguageCode: db.target_language_code,
			translation: db.translation ? (JSON.parse(db.translation) as TranslationBlock[]) : null,
			status: db.status,
			errorCode: db.error_code,
			nonExistentWord: db.non_existent_word,
			lemmas: db.lemmas ? (JSON.parse(db.lemmas) as string[]) : [],
			deepSections: db.deep_sections ? (JSON.parse(db.deep_sections) as TranslationBlock[]) : null,
			createdAt: db.created_at,
		}
	}
}
