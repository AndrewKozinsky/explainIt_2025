import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { BookChapterLiteOutModel } from '../bookChapter/bookChapter.out.model'

const $ = bdConfig.Book.dbFields
const $$ = bdConfig.Book.dtoProps

export class BookOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions($.type))
	type: 'public' | 'private'

	@ApiProperty(getApiPropertyOptions($.author))
	author: string | null

	@ApiProperty(getApiPropertyOptions($.name))
	name: null | string

	@ApiProperty(getApiPropertyOptions($.source_language_code))
	languageCode: null | string

	@ApiProperty(getApiPropertyOptions($.about))
	about: null | string

	@ApiProperty(getApiPropertyOptions($.user_id))
	userId: null | number

	@ApiProperty(getApiPropertyOptions($$.coverUrl))
	coverUrl: null | string

	@ApiProperty(getApiPropertyOptions($.cover_file_name))
	coverFileName: null | string

	@ApiProperty(getApiPropertyOptions($.cover_file_s3_key))
	coverFileS3Key: null | string

	@ApiProperty(getApiPropertyOptions($.is_cover_file_uploaded))
	isCoverFileUploaded: boolean

	@ApiProperty(getApiPropertyOptions($$.uploadUrl))
	uploadUrl: null | string

	@ApiProperty({ description: 'Book chapters', type: () => BookChapterLiteOutModel, isArray: true })
	chapters: BookChapterLiteOutModel[]
}

export class BookLiteOutModel {
	id: number
	author: null | string
	name: null | string
	languageCode: null | string
	about: null | string
	userId: null | number
}
