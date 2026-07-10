import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.VideoPrivate.dbFields

export class VideoPrivateLiteOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty({ description: 'User ID', example: 1 })
	userId: number

	@ApiProperty(getApiPropertyOptions($.name))
	name: string | null

	@ApiProperty(getApiPropertyOptions($.year))
	year: null | number

	@ApiProperty(getApiPropertyOptions($.source_language_code))
	languageCode: null | string

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
