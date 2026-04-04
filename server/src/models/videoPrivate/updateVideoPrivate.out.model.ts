import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Language } from 'utils/languages'

@ObjectType()
export class UpdateVideoPrivateOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: true })
	name: null | string

	@Field(() => Int, { nullable: true })
	year: null | number

	@Field(() => String, { nullable: true })
	languageCode: null | Language

	@Field(() => String, { nullable: true })
	originalContent: null | string

	@Field(() => String, { nullable: true })
	processedContent: null | string

	@Field(() => String)
	contentType: 'text' | 'subtitles'

	@Field(() => Int)
	userId: number

	@Field(() => String, { nullable: true })
	uploadUrl: string | null

	@Field(() => Int, { nullable: true })
	fileSizeMb: null | number
}
