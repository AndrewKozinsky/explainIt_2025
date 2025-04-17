import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CheckTranslationOutModel {
	@Field(() => String)
	analysis: string
}
