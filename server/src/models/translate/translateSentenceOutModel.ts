import { Field, ObjectType } from '@nestjs/graphql'

// Скорее всего нужно удалить в дальнейшем.
@ObjectType()
export class TranslateSentenceOutModel {
	@Field(() => String)
	translatedText: string
}
