import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TranslateSentenceOutModel {
	@Field(() => String)
	translatedText: string
}
