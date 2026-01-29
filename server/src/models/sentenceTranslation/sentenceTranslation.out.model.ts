import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SentenceTranslationOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	sentenceId: number

	@Field(() => String)
	provider: string

	@Field(() => String)
	translation: string

	@Field(() => String, { nullable: true })
	analysis: string | null

	@Field(() => String)
	createdAt: string
}
