import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SentencePhraseTranslationExampleOutModel {
	@Field(() => String)
	text: string

	@Field(() => String)
	translate: string
}

@ObjectType()
export class SentencePhraseTranslationOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	sentenceId: number

	@Field(() => String)
	phrase: string

	@Field(() => Int)
	phraseStartOffset: number

	@Field(() => Int)
	phraseEndOffset: number

	@Field(() => String, { nullable: true })
	translate: null | string

	@Field(() => [SentencePhraseTranslationExampleOutModel])
	examples: SentencePhraseTranslationExampleOutModel[]

	@Field(() => String)
	status: 'pending' | 'ready' | 'error'

	@Field(() => String, { nullable: true })
	errorMessage: null | string

	@Field(() => String)
	createdAt: string

	@Field(() => String)
	updatedAt: string
}
