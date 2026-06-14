import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class LanguageOutModel {
	@Field(() => String)
	name: string

	@Field(() => String)
	nameEng: string

	@Field(() => String)
	code: string
}
