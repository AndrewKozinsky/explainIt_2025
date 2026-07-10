import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class UpdateBookDto {
	@DtoFieldDecorators('author', bdConfig.BookPrivate.dbFields.author)
	author?: null | string

	@DtoFieldDecorators('name', bdConfig.BookPrivate.dbFields.name)
	name?: null | string

	@DtoFieldDecorators('languageCode', bdConfig.BookPrivate.dbFields.source_language_code, {
		required: false,
	})
	languageCode?: null | Language

	@DtoFieldDecorators('note', bdConfig.BookPrivate.dbFields.note)
	note?: null | string

	@DtoFieldDecorators('fileName', bdConfig.BookPrivate.dtoProps.fileName)
	fileName?: null | string

	@DtoFieldDecorators('fileMimeType', bdConfig.BookPrivate.dtoProps.fileMimeType)
	fileMimeType?: null | string

	@DtoFieldDecorators('isFileUploaded', bdConfig.BookPrivate.dbFields.is_file_uploaded, {
		required: false,
	})
	isFileUploaded?: boolean
}
