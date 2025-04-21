import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CheckTranslationOutModel {
	@Field(() => Boolean)
	correct: boolean

	@Field(() => String)
	analysis: string
}
