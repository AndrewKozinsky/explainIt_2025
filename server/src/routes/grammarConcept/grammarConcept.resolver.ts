import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { FetchGrammarConceptsCommand } from '../../features/grammarConcept/FetchGrammarConcepts.command'
import { RouteNames } from '../../infrastructure/routeNames'
import { UniversalSentenceOutModel } from '../../models/grammarConcept/grammarConcept.out.model'
import {
	GrammarConceptServiceModel,
	MissingGrammarConceptServiceModel,
} from '../../models/grammarConcept/grammarConcept.service.model'
import { GrammarConceptQueryRepository } from '../../repo/grammarConcept.queryRepository'
import { FetchGrammarConceptsInput } from './inputs/fetchGrammarConcepts.input'

@Resolver()
export class GrammarConceptResolver {
	constructor(
		private commandBus: CommandBus,
		private grammarConceptQueryRepo: GrammarConceptQueryRepository,
	) {}

	@Mutation(() => UniversalSentenceOutModel, {
		name: RouteNames.GRAMMAR_CONCEPT.FETCH,
		description: 'Extract grammar concepts from a sentence using AI and link to available articles',
	})
	async fetchGrammarConcepts(@Args('input') input: FetchGrammarConceptsInput) {
		const result = await this.commandBus.execute(
			new FetchGrammarConceptsCommand({
				sentenceText: input.sentenceText,
				sourceLanguage: input.sourceLanguage,
				targetLanguage: input.targetLanguage,
			}),
		)

		return {
			id: result.id,
			sentenceText: result.sentenceText,
			sourceLanguage: result.sourceLanguageCode,
			status: result.status,
			grammarConcepts: result.grammarConcepts.map((gc: GrammarConceptServiceModel) =>
				this.grammarConceptQueryRepo.mapDbToOutModel({
					id: gc.id,
					source_language_code: gc.sourceLanguageCode,
					target_language_code: gc.targetLanguageCode,
					category: gc.category,
					lemma: gc.lemma,
					title: gc.title,
					slug: gc.slug,
					order: gc.order,
				}),
			),
			missingGrammarConcepts: result.missingGrammarConcepts.map((m: MissingGrammarConceptServiceModel) =>
				this.grammarConceptQueryRepo.mapDbToMissingOutModel(m),
			),
		}
	}
}
