import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class VideoPublicLiteOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	name: string

	@Field(() => Int, { nullable: true })
	year: number | null

	@Field(() => String)
	languageCode: string

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

	@Field(() => String)
	fileUrl: string
}
