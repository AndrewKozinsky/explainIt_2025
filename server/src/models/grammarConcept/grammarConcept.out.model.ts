import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GrammarConceptOutModel {
	@Field(() => ID)
	id: string

	@Field(() => String)
	sourceLanguage: string

	@Field(() => String)
	targetLanguage: string

	@Field(() => String)
	category: string

	@Field(() => String)
	lemma: string

	@Field(() => String)
	title: string

	@Field(() => String)
	slug: string

	@Field(() => Int)
	order: number
}

@ObjectType()
export class MissingGrammarConceptOutModel {
	@Field(() => String)
	category: string

	@Field(() => String)
	lemma: string
}

@ObjectType()
export class UniversalPhraseOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	sentenceText: string

	@Field(() => String)
	sourceLanguage: string

	@Field(() => String)
	grammarExtractionStatus: string

	@Field(() => [GrammarConceptOutModel])
	grammarConcepts: GrammarConceptOutModel[]

	@Field(() => [MissingGrammarConceptOutModel])
	missingGrammarConcepts: MissingGrammarConceptOutModel[]
}
