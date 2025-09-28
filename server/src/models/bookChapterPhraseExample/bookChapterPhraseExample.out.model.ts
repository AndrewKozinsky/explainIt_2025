import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BookChapterPhraseExampleOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	sentence: string

	@Field(() => String)
	translation: string
}
