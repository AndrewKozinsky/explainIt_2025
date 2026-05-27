import { Injectable } from '@nestjs/common'
import { GrammarConceptOutModel, MissingGrammarConceptOutModel } from 'models/grammarConcept/grammarConcept.out.model'
import { PrismaService } from '../db/prisma.service'

@Injectable()
export class GrammarConceptQueryRepository {
	constructor(private prisma: PrismaService) {}

	mapDbToOutModel(db: {
		id: string
		source_language_code: string
		target_language_code: string
		category: string
		lemma: string
		title: string
		slug: string
		order: number
	}): GrammarConceptOutModel {
		return {
			id: db.id,
			sourceLanguage: db.source_language_code,
			targetLanguage: db.target_language_code,
			category: db.category,
			lemma: db.lemma,
			title: db.title,
			slug: db.slug,
			order: db.order,
		}
	}

	mapDbToMissingOutModel(db: { category: string; lemma: string }): MissingGrammarConceptOutModel {
		return {
			category: db.category,
			lemma: db.lemma,
		}
	}
}
