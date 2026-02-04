import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Language } from 'utils/languages'

@ObjectType()
export class CreateVideoPrivateOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: true })
	name: null | string

	@Field(() => Int, { nullable: true })
	year: null | number

	@Field(() => String)
	languageCode: Language

	@Field(() => String, { nullable: true })
	originalContent: null | string

	@Field(() => String, { nullable: true })
	processedContent: null | string

	@Field(() => String)
	contentType: 'text' | 'subtitles'

	@Field(() => Int)
	userId: number
}
