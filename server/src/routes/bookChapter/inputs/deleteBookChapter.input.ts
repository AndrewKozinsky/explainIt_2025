import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from '../../../db/dbConfig/dbConfig'
import { DtoFieldDecorators } from '../../../db/dtoFieldDecorators'

@InputType()
export class DeleteBookChapterInput {
	@Field(() => Int, { description: 'BookChapter id' })
	@DtoFieldDecorators('id', bdConfig.BookChapter.dbFields.id, { type: 'number', required: true, min: 1 })
	id: number
}
