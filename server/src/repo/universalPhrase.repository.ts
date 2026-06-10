import { Injectable } from '@nestjs/common'
import { UniversalPhraseServiceModel } from 'models/grammarConcept/grammarConcept.service.model'
import { LanguageCode, Prisma } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import { normalizeSentence } from '../features/grammarConcept/normalizeSentence'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

type DbUniversalPhraseWithRelations = Prisma.UniversalPhraseGetPayload<{
	include: {
		GrammarConceptToUniversalPhrase: {
			include: { grammar_concept: true }
		}
		MissingGrammarConcept: true
	}
}>

@Injectable()
export class UniversalPhraseRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async createUniversalPhrase(dto: { text: string; sourceLanguageCode: LanguageCode }) {
		return await this.prisma.universalPhrase.create({
			data: {
				text: dto.text,
				source_language_code: dto.sourceLanguageCode,
			},
		})
	}

	@CatchDbError()
	async findOrCreate(input: { sentenceText: string; sourceLanguage: string }): Promise<UniversalPhraseServiceModel> {
		const normalizedText = normalizeSentence(input.sentenceText)

		const existing = await this.prisma.universalPhrase.findUnique({
			where: {
				source_language_code_text: {
					text: normalizedText,
					source_language_code: input.sourceLanguage as any,
				},
			},
			include: {
				GrammarConceptToUniversalPhrase: {
					include: { grammar_concept: true },
				},
				MissingGrammarConcept: true,
			},
		})

		if (existing) {
			return this.mapDbToServiceModel(existing as DbUniversalPhraseWithRelations)
		}

		const created = await this.prisma.universalPhrase.create({
			data: {
				text: normalizedText,
				source_language_code: input.sourceLanguage as any,
				grammarExtractionStatus: 'NOT_STARTED',
			},
			include: {
				GrammarConceptToUniversalPhrase: {
					include: { grammar_concept: true },
				},
				MissingGrammarConcept: true,
			},
		})

		return this.mapDbToServiceModel(created as DbUniversalPhraseWithRelations)
	}

	@CatchDbError()
	async findByIdWithRelations(id: number): Promise<UniversalPhraseServiceModel | null> {
		const record = await this.prisma.universalPhrase.findUnique({
			where: { id },
			include: {
				GrammarConceptToUniversalPhrase: {
					include: { grammar_concept: true },
				},
				MissingGrammarConcept: true,
			},
		})
		if (!record) return null

		return this.mapDbToServiceModel(record as DbUniversalPhraseWithRelations)
	}

	@CatchDbError()
	async findBySentenceTextAndLang(
		sentenceText: string,
		sourceLanguage: string,
	): Promise<UniversalPhraseServiceModel | null> {
		const normalizedText = normalizeSentence(sentenceText)

		const record = await this.prisma.universalPhrase.findUnique({
			where: {
				source_language_code_text: {
					text: normalizedText,
					source_language_code: sourceLanguage as any,
				},
			},
			include: {
				GrammarConceptToUniversalPhrase: {
					include: { grammar_concept: true },
				},
				MissingGrammarConcept: true,
			},
		})

		if (!record) return null
		return this.mapDbToServiceModel(record as DbUniversalPhraseWithRelations)
	}

	@CatchDbError()
	async updateStatus(id: number, grammarExtractionStatus: 'NOT_STARTED' | 'ERROR' | 'SUCCESS'): Promise<void> {
		await this.prisma.universalPhrase.update({
			where: { id },
			data: { grammarExtractionStatus },
		})
	}

	@CatchDbError()
	async completeExtraction(
		universalPhraseId: number,
		grammarConceptIds: string[],
		missingItems: {
			sourceLanguage: string
			targetLanguage: string
			category: string
			alias: string
			sentenceText: string
		}[],
	): Promise<void> {
		await this.prisma.$transaction(async (tx) => {
			await tx.universalPhrase.update({
				where: { id: universalPhraseId },
				data: { grammarExtractionStatus: 'SUCCESS' },
			})

			if (grammarConceptIds.length > 0) {
				await tx.grammarConceptToUniversalPhrase.createMany({
					data: grammarConceptIds.map((gcId) => ({
						grammar_concept_id: gcId,
						universal_phrase_id: universalPhraseId,
					})),
					skipDuplicates: true,
				})
			}

			if (missingItems.length > 0) {
				await tx.missingGrammarConcept.createMany({
					data: missingItems.map((item) => ({
						universal_phrase_id: universalPhraseId,
						source_language_code: item.sourceLanguage as any,
						target_language_code: item.targetLanguage as any,
						category: item.category,
						alias: item.alias,
						sentence_text: item.sentenceText,
					})) as any,
				})
			}
		})
	}

	private mapDbToServiceModel(db: DbUniversalPhraseWithRelations): UniversalPhraseServiceModel {
		return {
			id: db.id,
			sentenceText: db.text,
			sourceLanguageCode: db.source_language_code,
			grammarExtractionStatus: db.grammarExtractionStatus as 'NOT_STARTED' | 'ERROR' | 'SUCCESS',
			grammarConcepts: db.GrammarConceptToUniversalPhrase.map((j) => ({
				id: j.grammar_concept.id,
				sourceLanguageCode: j.grammar_concept.source_language_code,
				targetLanguageCode: j.grammar_concept.target_language_code,
				category: j.grammar_concept.category,
				title: j.grammar_concept.title,
				slug: j.grammar_concept.slug,
				order: j.grammar_concept.order,
				aliases: j.grammar_concept.aliases,
			})),
			missingGrammarConcepts: db.MissingGrammarConcept.map((m) => ({
				id: m.id,
				universalPhraseId: m.universal_phrase_id,
				sourceLanguageCode: m.source_language_code,
				targetLanguageCode: m.target_language_code,
				category: m.category,
				alias: m.alias,
				sentenceText: m.sentence_text,
			})),
		}
	}
}
