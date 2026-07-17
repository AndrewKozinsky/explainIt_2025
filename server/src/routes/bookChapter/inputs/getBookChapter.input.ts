import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class GetBookChapterInput {
	@DtoFieldDecorators('bookType', bdConfig.Book.dbFields.id)
	bookType: 'public' | 'private'

	@DtoFieldDecorators('targetLanguageCode', bdConfig.SentenceTranslation.dbFields.target_language_code, {
		required: false,
	})
	targetLanguageCode?: string
}
