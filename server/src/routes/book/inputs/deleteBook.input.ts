import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from '../../../db/dbConfig/dbConfig'
import { DtoFieldDecorators } from '../../../db/dtoFieldDecorators'

@InputType()
export class DeleteBookInput {
	@Field(() => Int, { description: 'Book id' })
	@DtoFieldDecorators('id', bdConfig.Book.dbFields.id, { type: 'number', required: true, min: 1 })
	id: number
}
