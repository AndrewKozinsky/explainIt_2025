import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BookLiteOutModel, BookOutModel } from '../book/book.out.model'

@ObjectType()
export class BookChapterPhraseOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	sentence: string

	@Field(() => String)
	phrase: string

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
