import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Language } from 'utils/languages'

@ObjectType()
export class UpdateVideoPublicOutModel {
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

	@Field(() => String, { nullable: true })
	fileName: null | string

	@Field(() => String, { nullable: true })
	fileS3Key: null | string
}
