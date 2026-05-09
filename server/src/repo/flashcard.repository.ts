import { Injectable } from '@nestjs/common'
import { FlashcardServiceModel } from 'models/flashcard/flashcard.service.model'
import { SentencePhraseTranslationExampleServiceModel } from 'models/sentenceTranslation/sentencePhraseTranslation.service.model'
import { Flashcard, LanguageCode } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class FlashcardRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createFlashcard(dto: {
		userId: number
		languageCode: LanguageCode
		sentenceText: string
		sentenceTranslation: null | string
		phrase: string
		phraseStartOffset: number
		phraseEndOffset: number
		phraseTranslation: null | string
		examples: SentencePhraseTranslationExampleServiceModel[]
		bookPrivateId: null | number
		bookPublicId: null | number
		videoPrivateId: null | number
		videoPublicId: null | number
		sentencePhraseTranslationId: null | number
	}): Promise<FlashcardServiceModel> {
		const db = await this.prisma.flashcard.create({
			data: {
				user_id: dto.userId,
				language_code: dto.languageCode,
				sentence_text: dto.sentenceText,
				sentence_translation: dto.sentenceTranslation,
				phrase: dto.phrase,
				phrase_start_offset: dto.phraseStartOffset,
				phrase_end_offset: dto.phraseEndOffset,
				phrase_translation: dto.phraseTranslation,
				examples: this.encodeExamples(dto.examples),
				book_private_id: dto.bookPrivateId,
				book_public_id: dto.bookPublicId,
				video_private_id: dto.videoPrivateId,
				video_public_id: dto.videoPublicId,
				sentence_phrase_translation_id: dto.sentencePhraseTranslationId,
			},
		})

		return this.mapDbToService(db)
	}

	@CatchDbError()
	async getFlashcardById(id: number): Promise<null | FlashcardServiceModel> {
		const db = await this.prisma.flashcard.findUnique({ where: { id } })
		if (!db) return null

		return this.mapDbToService(db)
	}

	@CatchDbError()
	async deleteFlashcardById(id: number): Promise<void> {
		await this.prisma.flashcard.delete({ where: { id } })
	}

	@CatchDbError()
	async getFlashcardByUserAndPhraseId(
		userId: number,
		sentencePhraseTranslationId: number,
	): Promise<null | FlashcardServiceModel> {
		const db = await this.prisma.flashcard.findFirst({
			where: {
				user_id: userId,
				sentence_phrase_translation_id: sentencePhraseTranslationId,
			},
		})
		if (!db) return null

		return this.mapDbToService(db)
	}

	@CatchDbError()
	async getFlashcardIdsByUserAndPhrasesIds(
		userId: number,
		sentencePhraseTranslationIds: number[],
	): Promise<Map<number, number>> {
		const map = new Map<number, number>()
		if (sentencePhraseTranslationIds.length === 0) return map

		const rows = await this.prisma.flashcard.findMany({
			where: {
				user_id: userId,
				sentence_phrase_translation_id: { in: sentencePhraseTranslationIds },
			},
			select: { id: true, sentence_phrase_translation_id: true },
		})

		for (const row of rows) {
			if (row.sentence_phrase_translation_id === null) continue
			map.set(row.sentence_phrase_translation_id, row.id)
		}

		return map
	}

	private mapDbToService = (db: Flashcard): FlashcardServiceModel => ({
		id: db.id,
		userId: db.user_id,
		languageCode: db.language_code,
		sentenceText: db.sentence_text,
		sentenceTranslation: db.sentence_translation,
		phrase: db.phrase,
		phraseStartOffset: db.phrase_start_offset,
		phraseEndOffset: db.phrase_end_offset,
		phraseTranslation: db.phrase_translation,
		examples: this.decodeExamples(db.examples),
		bookPrivateId: db.book_private_id,
		bookPublicId: db.book_public_id,
		videoPrivateId: db.video_private_id,
		videoPublicId: db.video_public_id,
		sentencePhraseTranslationId: db.sentence_phrase_translation_id,
		createdAt: db.created_at,
	})

	private encodeExamples(examples: SentencePhraseTranslationExampleServiceModel[]): string[] {
		return examples.flatMap((item) => [item.text, item.translate])
	}

	private decodeExamples(examples: string[]): SentencePhraseTranslationExampleServiceModel[] {
		const result: SentencePhraseTranslationExampleServiceModel[] = []
		for (let i = 0; i + 1 < examples.length; i += 2) {
			const text = examples[i]
			const translate = examples[i + 1]
			if (!text || !translate) continue
			result.push({ text, translate })
		}
		return result
	}
}
