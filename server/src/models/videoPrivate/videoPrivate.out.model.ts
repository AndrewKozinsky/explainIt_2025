import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BookChapterLiteOutModel } from '../bookChapter/bookChapter.out.model'

@ObjectType()
export class VideoPrivateOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	userId: number

	@Field(() => String, { nullable: true })
	name: string | null

	@Field(() => String, { nullable: true })
	subtitles: string | null

	@Field(() => String, { nullable: true })
	fileName: string | null

	@Field(() => String, { nullable: true })
	fileS3Key: string | null

	@Field(() => String, { nullable: true })
	fileUrl: string | null

	@Field(() => Boolean)
	isFileUploaded: boolean
}
