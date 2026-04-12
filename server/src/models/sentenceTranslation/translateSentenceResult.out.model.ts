import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TranslateSentenceResultOutModel {
	@Field(() => Int)
	sentenceId: number

	@Field(() => String)
	translation: string
}
