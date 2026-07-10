import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class CreateBookChapterDto {
	@DtoFieldDecorators('bookType', bdConfig.BookChapter.dtoProps.bookType)
	bookType: 'public' | 'private'

	@DtoFieldDecorators('bookId', bdConfig.BookPrivate.dbFields.id, { type: 'number', required: true, min: 1 })
	bookId: number

	@DtoFieldDecorators('name', bdConfig.BookChapter.dbFields.name)
	name?: null | string

	@DtoFieldDecorators('header', bdConfig.BookChapter.dbFields.header)
	header?: null | string

	@DtoFieldDecorators('originalContent', bdConfig.BookChapter.dbFields.original_content)
	originalContent?: null | string

	@DtoFieldDecorators('note', bdConfig.BookChapter.dbFields.note)
	note?: null | string
}
