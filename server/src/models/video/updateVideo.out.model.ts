import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.Video.dbFields

export class UpdateVideoOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions($.name))
	name: null | string

	@ApiProperty(getApiPropertyOptions($.source_language_code))
	languageCode: string

	@ApiProperty(getApiPropertyOptions($.original_content))
	originalContent: null | string

	@ApiProperty(getApiPropertyOptions($.processed_content))
	processedContent: null | string

	@ApiProperty(getApiPropertyOptions($.content_type))
	contentType: 'text' | 'subtitles'

	@ApiProperty(getApiPropertyOptions(bdConfig.User.dbFields.id))
	userId: null | number

	@ApiProperty({ description: 'Pre-signed URL for uploading the video file to S3', example: 'https://...' })
	uploadUrl: string | null

	@ApiProperty({ description: 'Pre-signed URL for uploading the video cover to S3', example: 'https://...' })
	uploadCoverUrl: string | null

	@ApiProperty(getApiPropertyOptions($.file_size_mb))
	fileSizeMb: null | number

	@ApiProperty(getApiPropertyOptions($.file_duration_sec))
	fileDurationSec: null | number
}
