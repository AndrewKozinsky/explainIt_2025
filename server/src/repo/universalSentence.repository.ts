import { Injectable } from '@nestjs/common'
import { UniversalSentenceServiceModel } from 'models/grammarConcept/grammarConcept.service.model'
import { Prisma } from 'prisma/generated/client'
import { PrismaService } from '../db/prisma.service'
import { normalizeSentence } from '../features/grammarConcept/normalizeSentence'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

type DbUniversalSentenceWithRelations = Prisma.UniversalSentenceGetPayload<{
	include: {
		GrammarConceptToUniversalSentence: {
			include: { grammar_concept: true }
		}
		MissingGrammarConcept: true
	}
}>

@Injectable()
export class UniversalSentenceRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async findOrCreate(input: {
		sentenceText: string
		sourceLanguage: string
	}): Promise<UniversalSentenceServiceModel> {
		const normalizedText = normalizeSentence(input.sentenceText)

		const existing = await this.prisma.universalSentence.findUnique({
			where: {
				sentence_text_source_language_code: {
					sentence_text: normalizedText,
					source_language_code: input.sourceLanguage as any,
				},
			},
			include: {
				GrammarConceptToUniversalSentence: {
					include: { grammar_concept: true },
				},
				MissingGrammarConcept: true,
			},
		})

		if (existing) {
			return this.mapDbToServiceModel(existing as DbUniversalSentenceWithRelations)
		}

		const created = await this.prisma.universalSentence.create({
			data: {
				sentence_text: normalizedText,
				source_language_code: input.sourceLanguage as any,
				status: 'NOT_STARTED',
			},
			include: {
				GrammarConceptToUniversalSentence: {
					include: { grammar_concept: true },
				},
				MissingGrammarConcept: true,
			},
		})

		return this.mapDbToServiceModel(created as DbUniversalSentenceWithRelations)
	}

	@CatchDbError()
	async findByIdWithRelations(id: number): Promise<UniversalSentenceServiceModel | null> {
		const record = await this.prisma.universalSentence.findUnique({
			where: { id },
			include: {
				GrammarConceptToUniversalSentence: {
					include: { grammar_concept: true },
				},
				MissingGrammarConcept: true,
			},
		})
		if (!record) return null

		return this.mapDbToServiceModel(record as DbUniversalSentenceWithRelations)
	}

	@CatchDbError()
	async findBySentenceTextAndLang(
		sentenceText: string,
		sourceLanguage: string,
	): Promise<UniversalSentenceServiceModel | null> {
		const normalizedText = normalizeSentence(sentenceText)

		const record = await this.prisma.universalSentence.findUnique({
			where: {
				sentence_text_source_language_code: {
					sentence_text: normalizedText,
					source_language_code: sourceLanguage as any,
				},
			},
			include: {
				GrammarConceptToUniversalSentence: {
					include: { grammar_concept: true },
				},
				MissingGrammarConcept: true,
			},
		})

		if (!record) return null
		return this.mapDbToServiceModel(record as DbUniversalSentenceWithRelations)
	}

	@CatchDbError()
	async updateStatus(id: number, status: 'NOT_STARTED' | 'ERROR' | 'SUCCESS'): Promise<void> {
		await this.prisma.universalSentence.update({
			where: { id },
			data: { status },
		})
	}

	@CatchDbError()
	async completeExtraction(
		universalSentenceId: number,
		grammarConceptIds: string[],
		missingItems: {
			sourceLanguage: string
			targetLanguage: string
			category: string
			lemma: string
			sentenceText: string
		}[],
	): Promise<void> {
		await this.prisma.$transaction(async (tx) => {
			await tx.universalSentence.update({
				where: { id: universalSentenceId },
				data: { status: 'SUCCESS' },
			})

			if (grammarConceptIds.length > 0) {
				await tx.grammarConceptToUniversalSentence.createMany({
					data: grammarConceptIds.map((gcId) => ({
						grammar_concept_id: gcId,
						universal_sentence_id: universalSentenceId,
					})),
					skipDuplicates: true,
				})
			}

			if (missingItems.length > 0) {
				await tx.missingGrammarConcept.createMany({
					data: missingItems.map((item) => ({
						universal_sentence_id: universalSentenceId,
						source_language_code: item.sourceLanguage as any,
						target_language_code: item.targetLanguage as any,
						category: item.category,
						lemma: item.lemma,
						sentence_text: item.sentenceText,
					})) as any,
				})
			}
		})
	}

	private mapDbToServiceModel(db: DbUniversalSentenceWithRelations): UniversalSentenceServiceModel {
		return {
			id: db.id,
			sentenceText: db.sentence_text,
			sourceLanguageCode: db.source_language_code,
			status: db.status as 'NOT_STARTED' | 'ERROR' | 'SUCCESS',
			grammarConcepts: db.GrammarConceptToUniversalSentence.map((j) => ({
				id: j.grammar_concept.id,
				sourceLanguageCode: j.grammar_concept.source_language_code,
				targetLanguageCode: j.grammar_concept.target_language_code,
				category: j.grammar_concept.category,
				lemma: j.grammar_concept.lemma,
				title: j.grammar_concept.title,
				slug: j.grammar_concept.slug,
				order: j.grammar_concept.order,
				aliases: j.grammar_concept.aliases,
			})),
			missingGrammarConcepts: db.MissingGrammarConcept.map((m) => ({
				id: m.id,
				universalSentenceId: m.universal_sentence_id,
				sourceLanguageCode: m.source_language_code,
				targetLanguageCode: m.target_language_code,
				category: m.category,
				lemma: m.lemma,
				sentenceText: m.sentence_text,
			})),
		}
	}
}
