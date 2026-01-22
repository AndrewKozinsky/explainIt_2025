import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class DeleteBookChapterPhrasesInput {
	@Field(() => Int, { description: 'Book chapter id' })
	@DtoFieldDecorators('bookChapterId', bdConfig.BookChapter.dbFields.id)
	bookChapterId: number
}
