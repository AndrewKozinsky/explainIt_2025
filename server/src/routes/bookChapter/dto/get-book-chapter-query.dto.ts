import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class GetBookChapterQueryDto {
	@DtoFieldDecorators('bookType', bdConfig.BookChapter.dtoProps.bookType)
	bookType: 'public' | 'private'

	@DtoFieldDecorators('targetLanguageCode', bdConfig.SentenceTranslation.dbFields.target_language_code, {
		required: false,
	})
	targetLanguageCode?: string
}
