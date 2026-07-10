import { ApiProperty } from '@nestjs/swagger'
import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.VideoPrivate.dbFields

export class CreateVideoPrivateOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions($.name))
	name: null | string

	@ApiProperty(getApiPropertyOptions($.year))
	year: null | number

	@ApiProperty(getApiPropertyOptions($.source_language_code))
	languageCode: Language

	@ApiProperty(getApiPropertyOptions($.original_content))
	originalContent: null | string

	@ApiProperty(getApiPropertyOptions($.processed_content))
	processedContent: null | string

	@ApiProperty(getApiPropertyOptions($.content_type))
	contentType: 'text' | 'subtitles'

	@ApiProperty({ description: 'User ID', example: 1 })
	userId: number
}
