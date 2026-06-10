import { Field, ObjectType } from '@nestjs/graphql'
import { GrammarConceptOutModel } from './grammarConcept.out.model'

@ObjectType()
export class GrammarConceptCategoryGroup {
	@Field(() => String)
	category: string

	@Field(() => [GrammarConceptOutModel])
	articles: GrammarConceptOutModel[]
}

@ObjectType()
export class GrammarConceptsListOutModel {
	@Field(() => String)
	sourceLanguage: string

	@Field(() => String)
	targetLanguage: string

	@Field(() => [GrammarConceptCategoryGroup])
	categories: GrammarConceptCategoryGroup[]
}
