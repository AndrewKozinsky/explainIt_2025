import { CommandBus } from '@nestjs/cqrs'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GrammarConceptQueryRepository } from 'repo/grammarConcept.queryRepository'
import { FetchGrammarConceptsCommand } from 'features/grammarConcept/FetchGrammarConcepts.command'
import { GetGrammarArticleCommand } from 'features/grammarConcept/GetGrammarArticle.command'
import { GetGrammarConceptsListCommand } from 'features/grammarConcept/GetGrammarConceptsList.command'
import { RouteNames } from 'infrastructure/routeNames'
import { GrammarArticleOutModel } from 'models/grammarConcept/grammarArticle.out.model'
import { GrammarExtractionOutModel } from 'models/grammarConcept/grammarConcept.out.model'
import {
	GrammarConceptServiceModel,
	MissingGrammarConceptServiceModel,
} from 'models/grammarConcept/grammarConcept.service.model'
import { GrammarConceptsListOutModel } from 'models/grammarConcept/grammarConceptsList.out.model'
import { FetchGrammarConceptsInput } from './inputs/fetchGrammarConcepts.input'
import { GetGrammarArticleInput } from './inputs/getGrammarArticle.input'
import { GetGrammarConceptsListInput } from './inputs/getGrammarConceptsList.input'

@Resolver()
export class GrammarConceptResolver {
	constructor(
		private commandBus: CommandBus,
		private grammarConceptQueryRepo: GrammarConceptQueryRepository,
	) {}

	@Mutation(() => GrammarExtractionOutModel, {
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
			grammarExtractionStatus: result.grammarExtractionStatus,
			grammarConcepts: result.grammarConcepts.map((gc: GrammarConceptServiceModel) =>
				this.grammarConceptQueryRepo.mapDbToOutModel({
					id: gc.id,
					source_language_code: gc.sourceLanguageCode,
					target_language_code: gc.targetLanguageCode,
					category: gc.category,
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

	@Query(() => GrammarArticleOutModel, {
		name: RouteNames.GRAMMAR_CONCEPT.ARTICLE_GET,
		description: 'Get grammar article content by language, category and slug',
	})
	async getGrammarArticle(@Args('input') input: GetGrammarArticleInput) {
		return await this.commandBus.execute(
			new GetGrammarArticleCommand({
				sourceLanguage: input.sourceLanguage,
				targetLanguage: input.targetLanguage,
				category: input.category,
				slug: input.slug,
			}),
		)
	}

	@Query(() => GrammarConceptsListOutModel, {
		name: RouteNames.GRAMMAR_CONCEPT.LIST,
		description: 'Get all grammar articles grouped by category for a language pair',
	})
	async getGrammarConceptsList(@Args('input') input: GetGrammarConceptsListInput) {
		return await this.commandBus.execute(
			new GetGrammarConceptsListCommand({
				sourceLanguage: input.sourceLanguage,
				targetLanguage: input.targetLanguage,
			}),
		)
	}
}
