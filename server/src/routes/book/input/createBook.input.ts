import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class CreateBookInput {
	@DtoFieldDecorators('author', bdConfig.Book.dbFields.author)
	author?: null | string

	@DtoFieldDecorators('name', bdConfig.Book.dbFields.name)
	name?: null | string

	@DtoFieldDecorators('note', bdConfig.Book.dbFields.about)
	about?: null | string

	@DtoFieldDecorators('languageCode', bdConfig.Book.dbFields.source_language_code)
	languageCode: Language
}
