import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs'
import { GrammarConceptQueryRepository } from 'repo/grammarConcept.queryRepository'
import { GrammarConceptRepository } from 'repo/grammarConcept.repository'
import { GrammarConceptOutModel } from 'models/grammarConcept/grammarConcept.out.model'

export class GetGrammarConceptsListCommand implements ICommand {
	constructor(
		public input: {
			sourceLanguage: string
			targetLanguage: string
		},
	) {}
}

export type GrammarConceptsListResult = {
	sourceLanguage: string
	targetLanguage: string
	categories: {
		category: string
		articles: GrammarConceptOutModel[]
	}[]
}

@CommandHandler(GetGrammarConceptsListCommand)
export class GetGrammarConceptsListHandler implements ICommandHandler<GetGrammarConceptsListCommand> {
	constructor(
		private grammarConceptRepo: GrammarConceptRepository,
		private grammarConceptQueryRepo: GrammarConceptQueryRepository,
	) {}

	async execute(command: GetGrammarConceptsListCommand): Promise<GrammarConceptsListResult> {
		const { sourceLanguage, targetLanguage } = command.input

		const allConcepts = await this.grammarConceptRepo.findByLanguages(sourceLanguage, targetLanguage)

		// Group by category, mapping DB rows to OutModel
		const categoryMap = new Map<string, GrammarConceptOutModel[]>()

		for (const concept of allConcepts) {
			const articles = categoryMap.get(concept.category) || []

			articles.push(
				this.grammarConceptQueryRepo.mapDbToOutModel({
					id: concept.id,
					source_language_code: concept.sourceLanguageCode,
					target_language_code: concept.targetLanguageCode,
					category: concept.category,
					title: concept.title,
					slug: concept.slug,
					order: concept.order,
				}),
			)

			categoryMap.set(concept.category, articles)
		}

		const categories = Array.from(categoryMap.entries()).map(([category, articles]) => ({
			category,
			articles,
		}))

		return {
			sourceLanguage,
			targetLanguage,
			categories,
		}
	}
}
