import { Injectable } from '@nestjs/common'
import { GrammarConceptServiceModel } from 'models/grammarConcept/grammarConcept.service.model'
import { LanguageCode } from 'prisma/generated/enums'
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
			aliases: { has: item.lemma },
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
		title: string
		slug: string
		order: number
		aliases: string[]
	}): Promise<GrammarConceptServiceModel> {
		// If a record with this id exists but has different unique fields
		// (e.g. category or slug was changed in the file), delete it first.
		const existingById = await this.prisma.grammarConcept.findUnique({
			where: { id: dto.id },
			select: { id: true, source_language_code: true, target_language_code: true, category: true, slug: true },
		})

		if (
			existingById &&
			(existingById.source_language_code !== dto.sourceLanguageCode ||
				existingById.target_language_code !== dto.targetLanguageCode ||
				existingById.category !== dto.category ||
				existingById.slug !== dto.slug)
		) {
			await this.prisma.grammarConcept.delete({ where: { id: dto.id } })
		}

		const gc = await this.prisma.grammarConcept.upsert({
			where: {
				source_language_code_target_language_code_category_slug: {
					source_language_code: dto.sourceLanguageCode as any,
					target_language_code: dto.targetLanguageCode as any,
					category: dto.category,
					slug: dto.slug,
				},
			},
			create: {
				id: dto.id,
				source_language_code: dto.sourceLanguageCode as any,
				target_language_code: dto.targetLanguageCode as any,
				category: dto.category,
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

	// Попробуй string поменять на LanguageCode
	@CatchDbError()
	async findByLanguages(
		sourceLanguageCode: string,
		targetLanguageCode: string,
	): Promise<GrammarConceptServiceModel[]> {
		const grammarConcepts = await this.prisma.grammarConcept.findMany({
			where: {
				source_language_code: sourceLanguageCode as LanguageCode,
				target_language_code: targetLanguageCode as LanguageCode,
			},
			orderBy: { order: 'asc' },
		})

		return grammarConcepts.map((gc) => this.mapDbToServiceModel(gc))
	}

	private mapDbToServiceModel(db: {
		id: string
		source_language_code: string
		target_language_code: string
		category: string
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
			title: db.title,
			slug: db.slug,
			order: db.order,
			aliases: db.aliases,
		}
	}
}
