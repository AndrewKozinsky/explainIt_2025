import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { BookChapterLiteOutModel } from '../bookChapter/bookChapter.out.model'

const $ = bdConfig.BookPrivate.dbFields
const $$ = bdConfig.BookPrivate.dtoProps

export class BookPrivateOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions($.author))
	author: string | null

	@ApiProperty(getApiPropertyOptions($.name))
	name: null | string

	@ApiProperty(getApiPropertyOptions($.source_language_code))
	languageCode: null | string

	@ApiProperty(getApiPropertyOptions($.note))
	note: null | string

	@ApiProperty(getApiPropertyOptions($.user_id))
	userId: number

	@ApiProperty(getApiPropertyOptions($$.coverUrl))
	coverUrl: null | string

	@ApiProperty(getApiPropertyOptions($.file_name))
	fileName: null | string

	@ApiProperty(getApiPropertyOptions($.file_s3_key))
	fileS3Key: null | string

	@ApiProperty(getApiPropertyOptions($.is_file_uploaded))
	isFileUploaded: boolean

	@ApiProperty(getApiPropertyOptions($$.uploadUrl))
	uploadUrl: null | string

	@ApiProperty({ description: 'Book chapters', type: [BookChapterLiteOutModel] })
	chapters: BookChapterLiteOutModel[]
}

export class BookLiteOutModel {
	id: number

	author: null | string

	name: null | string

	languageCode: null | string

	note: null | string

	userId: null | number
}
