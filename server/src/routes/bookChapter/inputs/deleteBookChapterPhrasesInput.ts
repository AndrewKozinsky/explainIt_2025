import { Field, InputType, Int } from '@nestjs/graphql'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { bdConfig } from 'src/db/dbConfig/dbConfig'

@InputType()
export class DeleteBookChapterPhrasesInput {
	@Field(() => Int, { description: 'Book chapter id' })
	@DtoFieldDecorators('bookChapterId', bdConfig.BookChapter.dbFields.id)
	bookChapterId: number
}
