import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.Video.dbFields

export class VideoLiteOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions(bdConfig.VideoCollection.dbFields.id))
	videoCollectionId: number

	@ApiProperty(getApiPropertyOptions(bdConfig.VideoCollection.dbFields.type))
	type: 'public' | 'private'

	@ApiProperty(getApiPropertyOptions(bdConfig.User.dbFields.id))
	userId: null | number

	@ApiProperty(getApiPropertyOptions($.name))
	name: string | null

	@ApiProperty(getApiPropertyOptions(bdConfig.VideoCollection.dtoProps.languageCode))
	languageCode: null | string

	@ApiProperty(getApiPropertyOptions($.note))
	note: string | null

	@ApiProperty(getApiPropertyOptions($.original_content))
	originalContent: null | string

	@ApiProperty(getApiPropertyOptions($.processed_content))
	processedContent: null | string

	@ApiProperty(getApiPropertyOptions($.content_type))
	contentType: 'text' | 'subtitles'

	@ApiProperty(getApiPropertyOptions($.file_name))
	fileName: null | string

	@ApiProperty(getApiPropertyOptions($.file_s3_key))
	fileS3Key: null | string

	@ApiProperty({ description: 'Pre-signed URL for downloading the video file from S3', example: 'https://...' })
	fileUrl: null | string

	@ApiProperty(getApiPropertyOptions($.is_file_uploaded))
	isFileUploaded: boolean

	@ApiProperty(getApiPropertyOptions($.file_size_mb))
	fileSizeMb: number

	@ApiProperty(getApiPropertyOptions($.file_duration_sec))
	fileDurationSec: null | number
}
