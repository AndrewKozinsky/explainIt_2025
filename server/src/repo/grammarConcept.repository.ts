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
		const gc = await this.prisma.grammarConcept.upsert({
			where: { id: dto.id },
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
				source_language_code: dto.sourceLanguageCode as any,
				target_language_code: dto.targetLanguageCode as any,
				category: dto.category,
				lemma: dto.lemma,
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
