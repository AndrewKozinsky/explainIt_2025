import { Injectable } from '@nestjs/common'
import { FlashcardOutModel } from 'models/flashcard/flashcard.out.model'
import { SentencePhraseTranslationExampleOutModel } from 'models/sentenceTranslation/sentencePhraseTranslation.out.model'
import { Flashcard, LanguageCode } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class FlashcardQueryRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getMyFlashcards(dto: { userId: number; languageCode?: LanguageCode }): Promise<FlashcardOutModel[]> {
		const rows = await this.prisma.flashcard.findMany({
			where: {
				user_id: dto.userId,
				...(dto.languageCode ? { language_code: dto.languageCode } : {}),
			},
			orderBy: { created_at: 'desc' },
		})

		if (!rows.length) return []

		const transcriptionMap = await this.fetchTranscriptionsMap(rows)

		return rows.map((row) =>
			this.mapDbToOut(row, transcriptionMap.get(this.makeKey(row.language_code, row.phrase)) ?? null),
		)
	}

	@CatchDbError()
	async getFlashcardById(id: number): Promise<null | FlashcardOutModel> {
		const row = await this.prisma.flashcard.findUnique({ where: { id } })
		if (!row) return null

		const transcriptionMap = await this.fetchTranscriptionsMap([row])
		return this.mapDbToOut(row, transcriptionMap.get(this.makeKey(row.language_code, row.phrase)) ?? null)
	}

	private async fetchTranscriptionsMap(rows: Flashcard[]): Promise<Map<string, string>> {
		const uniqueKeys = new Set<string>()
		const pairs: { language_code: LanguageCode; phrase: string }[] = []

		for (const row of rows) {
			const key = this.makeKey(row.language_code, row.phrase)

			if (uniqueKeys.has(key)) continue
			uniqueKeys.add(key)
			pairs.push({ language_code: row.language_code, phrase: row.phrase })
		}

		if (pairs.length === 0) return new Map()

		const dbPhrases = await this.prisma.universalPhrase.findMany({
			where: { OR: pairs },
			include: { UniversalTranscription: true },
		})

		const map = new Map<string, string>()

		for (const dbPhrase of dbPhrases) {
			const transcription = dbPhrase.UniversalTranscription
			if (!transcription) continue
			const value = transcription.ipa ?? transcription.pinyin
			if (!value) continue
			map.set(this.makeKey(dbPhrase.language_code, dbPhrase.phrase), value)
		}

		return map
	}

	private makeKey(languageCode: LanguageCode, phrase: string): string {
		return `${languageCode}::${phrase}`
	}

	private decodeExamples(examples: string[]): SentencePhraseTranslationExampleOutModel[] {
		const result: SentencePhraseTranslationExampleOutModel[] = []

		for (let i = 0; i + 1 < examples.length; i += 2) {
			const text = examples[i]
			const translate = examples[i + 1]
			if (!text || !translate) continue
			result.push({ text, translate })
		}

		return result
	}

	private mapDbToOut(db: Flashcard, phraseTranscription: null | string): FlashcardOutModel {
		return {
			id: db.id,
			languageCode: db.language_code,
			sentenceText: db.sentence_text,
			sentenceTranslation: db.sentence_translation,
			phrase: db.phrase,
			phraseStartOffset: db.phrase_start_offset,
			phraseEndOffset: db.phrase_end_offset,
			phraseTranslation: db.phrase_translation,
			phraseTranscription,
			examples: this.decodeExamples(db.examples),
			bookPrivateId: db.book_private_id,
			bookPublicId: db.book_public_id,
			videoPrivateId: db.video_private_id,
			videoPublicId: db.video_public_id,
			createdAt: db.created_at.toISOString(),
		}
	}
}
