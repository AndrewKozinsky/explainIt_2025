import { ApiProperty } from '@nestjs/swagger'
import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.Video.dbFields

export class CreateVideoOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions(bdConfig.VideoCollection.dbFields.id))
	videoCollectionId: number

	@ApiProperty(getApiPropertyOptions(bdConfig.VideoCollection.dbFields.type))
	type: 'public' | 'private'

	@ApiProperty(getApiPropertyOptions($.name))
	name: null | string

	@ApiProperty(getApiPropertyOptions(bdConfig.VideoCollection.dtoProps.languageCode))
	languageCode: Language

	@ApiProperty(getApiPropertyOptions($.original_content))
	originalContent: null | string

	@ApiProperty(getApiPropertyOptions($.processed_content))
	processedContent: null | string

	@ApiProperty(getApiPropertyOptions($.content_type))
	contentType: 'text' | 'subtitles'

	@ApiProperty(getApiPropertyOptions(bdConfig.User.dbFields.id))
	userId: null | number
}
