import { Injectable } from '@nestjs/common'
import { GrammarConceptServiceModel } from 'models/grammarConcept/grammarConcept.service.model'
import { PrismaService } from '../db/prisma.service'
import CatchDbError from '../infrastructure/exceptions/CatchDBErrors'

@Injectable()
export class GrammarConceptRepository {
	constructor(private prisma: PrismaService) {}

	@CatchDbError()
	async findByLemmas(input: {
		sourceLanguage: string
		targetLanguage: string
		items: { category: string; lemma: string }[]
	}): Promise<GrammarConceptServiceModel[]> {
		if (input.items.length === 0) return []

		const conditions = input.items.map((item) => ({
			source_language_code: input.sourceLanguage as any,
			target_language_code: input.targetLanguage as any,
			category: item.category,
			OR: [{ lemma: item.lemma }, { aliases: { has: item.lemma } }],
		}))

		const results = await this.prisma.grammarConcept.findMany({
			where: { OR: conditions },
		})

		return results.map((gc) => this.mapDbToServiceModel(gc))
	}

	@CatchDbError()
	async upsertByLessonId(dto: {
		id: string
		sourceLanguageCode: string
		targetLanguageCode: string
		category: string
		lemma: string
		title: string
		slug: string
		order: number
		aliases: string[]
	}): Promise<GrammarConceptServiceModel> {
		// If a record with this id exists but has different unique fields
		// (e.g. category or lemma was changed in the file), delete it first.
		const existingById = await this.prisma.grammarConcept.findUnique({
			where: { id: dto.id },
			select: { id: true, source_language_code: true, target_language_code: true, category: true, lemma: true },
		})

		if (
			existingById &&
			(existingById.source_language_code !== dto.sourceLanguageCode ||
				existingById.target_language_code !== dto.targetLanguageCode ||
				existingById.category !== dto.category ||
				existingById.lemma !== dto.lemma)
		) {
			await this.prisma.grammarConcept.delete({ where: { id: dto.id } })
		}

		const gc = await this.prisma.grammarConcept.upsert({
			where: {
				source_language_code_target_language_code_category_lemma: {
					source_language_code: dto.sourceLanguageCode as any,
					target_language_code: dto.targetLanguageCode as any,
					category: dto.category,
					lemma: dto.lemma,
				},
			},
			create: {
				id: dto.id,
				source_language_code: dto.sourceLanguageCode as any,
				target_language_code: dto.targetLanguageCode as any,
				category: dto.category,
				lemma: dto.lemma,
				title: dto.title,
				slug: dto.slug,
				order: dto.order,
				aliases: dto.aliases,
			},
			update: {
				title: dto.title,
				slug: dto.slug,
				order: dto.order,
				aliases: dto.aliases,
			},
		})

		return this.mapDbToServiceModel(gc)
	}

	@CatchDbError()
	async deleteNotInIds(ids: string[]): Promise<void> {
		await this.prisma.grammarConcept.deleteMany({
			where: { id: { notIn: ids } },
		})
	}

	@CatchDbError()
	async getAll(): Promise<GrammarConceptServiceModel[]> {
		const results = await this.prisma.grammarConcept.findMany()
		return results.map((gc) => this.mapDbToServiceModel(gc))
	}

	private mapDbToServiceModel(db: {
		id: string
		source_language_code: string
		target_language_code: string
		category: string
		lemma: string
		title: string
		slug: string
		order: number
		aliases: string[]
	}): GrammarConceptServiceModel {
		return {
			id: db.id,
			sourceLanguageCode: db.source_language_code,
			targetLanguageCode: db.target_language_code,
			category: db.category,
			lemma: db.lemma,
			title: db.title,
			slug: db.slug,
			order: db.order,
			aliases: db.aliases,
		}
	}
}
