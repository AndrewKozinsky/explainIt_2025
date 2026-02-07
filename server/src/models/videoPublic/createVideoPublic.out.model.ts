import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Language } from 'utils/languages'

@ObjectType()
export class CreateVideoPublicOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => Int, { nullable: true })
	year: null | number

	@Field(() => String)
	languageCode: Language

	@Field(() => String)
	originalContent: string

	@Field(() => String)
	processedContent: string

	@Field(() => String)
	contentType: 'text' | 'subtitles'

	@Field(() => String)
	fileName: string

	@Field(() => String)
	fileS3Key: string
}
