import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.VideoCollection.dbFields

export class VideoCollectionVideoOutModel {
	@ApiProperty({ description: 'Video ID', example: 1 })
	id: number

	@ApiProperty({ description: 'Video name', example: 'Lesson 1', nullable: true })
	name: string | null

	@ApiProperty({ description: 'Video note', example: 'Introduction', nullable: true })
	note: string | null

	@ApiProperty({ description: 'File name', example: 'lesson1.mp4', nullable: true })
	fileName: string | null

	@ApiProperty({
		description: 'Pre-signed URL for downloading the video file',
		example: 'https://...',
		nullable: true,
	})
	fileUrl: string | null

	@ApiProperty({ description: 'Whether the video file has been uploaded', example: true })
	isFileUploaded: boolean
}

export class VideoCollectionOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions($.type))
	type: 'public' | 'private'

	@ApiProperty(getApiPropertyOptions(bdConfig.User.dbFields.id))
	userId: null | number

	@ApiProperty(getApiPropertyOptions($.name))
	name: string | null

	@ApiProperty(getApiPropertyOptions($.source_language_code))
	languageCode: null | string

	@ApiProperty(getApiPropertyOptions($.note))
	note: string | null

	@ApiProperty({
		description: 'Videos in the collection',
		type: [VideoCollectionVideoOutModel],
	})
	videos: VideoCollectionVideoOutModel[]
}
