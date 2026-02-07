import { Field, Int, ObjectType } from '@nestjs/graphql'

// TODO: fileName, fileS3Key, fileUrl, originalContent, processedContent are always have value!
@ObjectType()
export class VideoPublicLiteOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: true })
	name: string | null

	@Field(() => Int, { nullable: true })
	year: number | null

	@Field(() => String)
	languageCode: string

	@Field(() => String, { nullable: true })
	originalContent: string | null

	@Field(() => String, { nullable: true })
	processedContent: string | null

	@Field(() => String)
	contentType: 'text' | 'subtitles'

	@Field(() => String, { nullable: true })
	fileName: string | null

	@Field(() => String, { nullable: true })
	fileS3Key: string | null

	@Field(() => String, { nullable: true })
	fileUrl: string | null
}
