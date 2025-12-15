import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class GetBookPublicInput {
	@Field(() => Int, { description: 'Book id' })
	@DtoFieldDecorators('id', bdConfig.BookPublic.dbFields.id, { type: 'number', required: true, min: 1 })
	id: number
}
