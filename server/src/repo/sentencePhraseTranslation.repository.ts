import { Injectable } from '@nestjs/common'
import { PrismaService } from 'db/prisma.service'
import CatchDbError from 'infrastructure/exceptions/CatchDBErrors'
import {
	SentencePhraseTranslationExampleServiceModel,
	SentencePhraseTranslationServiceModel,
} from 'models/sentenceTranslation/sentencePhraseTranslation.service.model'
import { SentencePhraseTranslation, Prisma } from 'prisma/generated/client'

@Injectable()
export class SentencePhraseTranslationRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async getPhraseContainingOffset(input: {
		sentenceId: number
		selectedWordStartOffset: number
		selectedWordEndOffset: number
	}) {
		const phrases = await this.getPhrasesBySentenceId(input.sentenceId)
		const phrase = phrases
			.filter(
				(item) =>
					item.phraseStartOffset <= input.selectedWordStartOffset &&
					item.phraseEndOffset >= input.selectedWordEndOffset,
			)
			.sort((a, b) => a.phraseStartOffset - b.phraseStartOffset || a.phraseEndOffset - b.phraseEndOffset)[0]

		if (!phrase) return null
		return phrase
	}

	@CatchDbError()
	async getPhrasesBySentenceId(sentenceId: number) {
		const rows = await this.prisma.sentencePhraseTranslation.findMany({
			where: {
				sentence_id: sentenceId,
			},
		})

		return rows.map(this.mapDbToService)
	}

	@CatchDbError()
	async getPhraseByExactRange(input: { sentenceId: number; phraseStartOffset: number; phraseEndOffset: number }) {
		const phrase = await this.prisma.sentencePhraseTranslation.findFirst({
			where: {
				sentence_id: input.sentenceId,
				phrase_start_offset: input.phraseStartOffset,
				phrase_end_offset: input.phraseEndOffset,
			},
		})

		if (!phrase) return null
		return this.mapDbToService(phrase)
	}

	@CatchDbError()
	async createPendingPhrase(input: {
		sentenceId: number
		phrase: string
		phraseStartOffset: number
		phraseEndOffset: number
	}) {
		const db = await this.prisma.sentencePhraseTranslation.create({
			data: {
				sentence_id: input.sentenceId,
				phrase: input.phrase,
				phrase_start_offset: input.phraseStartOffset,
				phrase_end_offset: input.phraseEndOffset,
				translate: null,
				examples: [],
				status: 'pending',
				error_message: null,
			},
		})

		return this.mapDbToService(db)
	}

	@CatchDbError()
	async updatePhraseById(
		id: number,
		dto: {
			phrase?: string
			phraseStartOffset?: number
			phraseEndOffset?: number
			translate?: null | string
			examples?: SentencePhraseTranslationExampleServiceModel[]
			status?: 'pending' | 'ready' | 'error'
			errorMessage?: null | string
		},
	) {
		const data: Prisma.SentencePhraseTranslationUpdateInput = {
			updated_at: new Date(),
		}

		if (typeof dto.phrase === 'string') data.phrase = dto.phrase
		if (typeof dto.phraseStartOffset === 'number') data.phrase_start_offset = dto.phraseStartOffset
		if (typeof dto.phraseEndOffset === 'number') data.phrase_end_offset = dto.phraseEndOffset
		if (dto.translate !== undefined) data.translate = dto.translate
		if (dto.examples !== undefined) data.examples = this.encodeExamples(dto.examples)
		if (dto.status !== undefined) data.status = dto.status
		if (dto.errorMessage !== undefined) data.error_message = dto.errorMessage

		const db = await this.prisma.sentencePhraseTranslation.update({
			where: { id },
			data,
		})

		return this.mapDbToService(db)
	}

	@CatchDbError()
	async deletePhraseById(id: number) {
		await this.prisma.sentencePhraseTranslation.delete({
			where: { id },
		})
	}

	@CatchDbError()
	async getPhraseById(id: number) {
		const db = await this.prisma.sentencePhraseTranslation.findUnique({
			where: { id },
		})
		if (!db) return null

		return this.mapDbToService(db)
	}

	private mapDbToService = (db: SentencePhraseTranslation): SentencePhraseTranslationServiceModel => {
		const examples = this.decodeExamples(db.examples)

		return {
			id: db.id,
			sentenceId: db.sentence_id,
			phrase: db.phrase,
			phraseStartOffset: db.phrase_start_offset,
			phraseEndOffset: db.phrase_end_offset,
			translate: db.translate,
			examples,
			status: db.status,
			errorMessage: db.error_message,
			createdAt: db.created_at,
			updatedAt: db.updated_at,
		}
	}

	private encodeExamples(examples: SentencePhraseTranslationExampleServiceModel[]): string[] {
		return examples.map((item) => JSON.stringify(item))
	}

	private decodeExamples(examples: string[]): SentencePhraseTranslationExampleServiceModel[] {
		return examples
			.map((item) => {
				try {
					const parsed = JSON.parse(item)

					if (
						parsed &&
						typeof parsed === 'object' &&
						typeof parsed.text === 'string' &&
						typeof parsed.translate === 'string'
					) {
						return {
							text: parsed.text,
							translate: parsed.translate,
						}
					}
				} catch {
					return null
				}

				return null
			})
			.filter(Boolean) as SentencePhraseTranslationExampleServiceModel[]
	}
}
