import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { BookChapterLiteOutModel } from 'models/bookChapter/bookChapter.out.model'

const $ = bdConfig.BookPublic.dbFields

export class BookPublicOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions($.author))
	author: null | string

	@ApiProperty(getApiPropertyOptions($.name))
	name: string

	@ApiProperty(getApiPropertyOptions($.note))
	note: string

	@ApiProperty(getApiPropertyOptions($.covers))
	covers: string[]

	@ApiProperty(getApiPropertyOptions($.source_language_code))
	languageCode: string

	@ApiProperty({
		description: 'Book chapters',
		type: [BookChapterLiteOutModel],
	})
	chapters: BookChapterLiteOutModel[]
}
