import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class VideoPrivateLiteOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	userId: number

	@Field(() => String, { nullable: true })
	name: string | null

	@Field(() => Int, { nullable: true })
	year: null | number

	@Field(() => String, { nullable: true })
	languageCode: null | string

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

	@Field(() => String, { nullable: true })
	fileUrl: null | string

	@Field(() => Boolean)
	isFileUploaded: boolean

	@Field(() => Int)
	fileSizeMb: number
}
