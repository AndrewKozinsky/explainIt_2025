import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.VideoPublic.dbFields
const $$ = bdConfig.VideoPublic.dtoProps

export class VideoPublicLiteOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions($.name))
	name: string

	@ApiProperty(getApiPropertyOptions($.year))
	year: number

	@ApiProperty(getApiPropertyOptions($.source_language_code))
	languageCode: string

	@ApiProperty(getApiPropertyOptions($.note))
	note: string

	@ApiProperty(getApiPropertyOptions($.covers))
	covers: string[]

	@ApiProperty(getApiPropertyOptions($.original_content))
	originalContent: string

	@ApiProperty(getApiPropertyOptions($.processed_content))
	processedContent: string

	@ApiProperty(getApiPropertyOptions($.content_type))
	contentType: 'text' | 'subtitles'

	@ApiProperty(getApiPropertyOptions($.file_name))
	fileName: string

	@ApiProperty(getApiPropertyOptions($.file_s3_key))
	fileS3Key: string

	@ApiProperty(getApiPropertyOptions($$.fileUrl))
	fileUrl: string
}
