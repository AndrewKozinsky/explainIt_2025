import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SentenceTranslationOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	sentenceId: number

	@Field(() => String)
	translation: string

	@Field(() => String)
	createdAt: string
}
