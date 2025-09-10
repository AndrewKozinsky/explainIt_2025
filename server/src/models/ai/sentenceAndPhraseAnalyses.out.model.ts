import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SentenceAndPhraseAnalysesOutModel {
	@Field(() => Int)
	id: number

	// @Field(() => String, { nullable: true })
	// author: string | null

	// @Field(() => String, { nullable: true })
	// name: string | null

	// @Field(() => String, { nullable: true })
	// note: string | null

	// @Field(() => Int)
	// userId: number
}
