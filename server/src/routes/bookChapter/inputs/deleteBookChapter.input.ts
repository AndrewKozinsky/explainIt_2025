import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class DeleteBookChapterInput {
	@DtoFieldDecorators('id', bdConfig.BookChapter.dbFields.id)
	id: number
}
