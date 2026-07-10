import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class CreatePrivateBookDto {
	@DtoFieldDecorators('author', bdConfig.BookPrivate.dbFields.author)
	author?: null | string

	@DtoFieldDecorators('name', bdConfig.BookPrivate.dbFields.name)
	name?: null | string

	@DtoFieldDecorators('note', bdConfig.BookPrivate.dbFields.note)
	note?: null | string

	@DtoFieldDecorators('languageCode', bdConfig.BookPrivate.dbFields.source_language_code, { required: true })
	languageCode: Language
}
