import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TranslateTextOutModel {
	@Field(() => String)
	translatedText: string
}
