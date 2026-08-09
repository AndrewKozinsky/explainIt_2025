import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class UpdateBookInput {
	@DtoFieldDecorators('author', bdConfig.Book.dbFields.author)
	author?: null | string

	@DtoFieldDecorators('name', bdConfig.Book.dbFields.name)
	name?: null | string

	@DtoFieldDecorators('languageCode', bdConfig.Book.dbFields.source_language_code, {
		required: false,
	})
	languageCode?: null | Language

	@DtoFieldDecorators('note', bdConfig.Book.dbFields.about)
	about?: null | string

	@DtoFieldDecorators('coverFileName', bdConfig.Book.dtoProps.coverFileName)
	coverFileName?: null | string

	@DtoFieldDecorators('fileMimeType', bdConfig.Book.dtoProps.fileMimeType)
	fileMimeType?: null | string

	@DtoFieldDecorators('isCoverFileUploaded', bdConfig.Book.dbFields.is_cover_file_uploaded, {
		required: false,
	})
	isCoverFileUploaded?: boolean
}
