import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BookChapterPhraseOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	sentenceId: number

	@Field(() => String)
	sentence: string

	@Field(() => String)
	phrase: string

	@Field(() => [Int])
	phraseWordsIdx: number[]

	@Field(() => String)
	translation: string

	@Field(() => String)
	analysis: string

	@Field(() => [PhraseExample])
	examples: PhraseExample[]
}

@ObjectType()
class PhraseExample {
	@Field(() => Int)
	id: number

	@Field(() => String)
	sentence: string

	@Field(() => String)
	translation: string
}
