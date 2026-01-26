import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class VideoPrivateOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	userId: number

	@Field(() => String, { nullable: true })
	name: string | null

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

	@Field(() => Boolean)
	isFileUploaded: boolean

	@Field(() => Int)
	fileSizeMb: number
}
