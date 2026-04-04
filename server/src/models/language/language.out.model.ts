import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class LanguageOutModel {
	@Field(() => String)
	code: string

	@Field(() => String)
	nameRus: string

	@Field(() => String)
	nameEng: string
}
