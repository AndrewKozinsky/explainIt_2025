import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from '../../../db/dbConfig/dbConfig'
import { DtoFieldDecorators } from '../../../db/dtoFieldDecorators'

@InputType()
export class CreateBookInput {
	@Field(() => String, { description: 'Author', nullable: true })
	@DtoFieldDecorators('author', bdConfig.Book.dbFields.author)
	author: null | string

	@Field(() => String, { description: 'Name', nullable: true })
	@DtoFieldDecorators('name', bdConfig.Book.dbFields.name)
	name: null | string

	@Field(() => String, { description: 'Note', nullable: true })
	@DtoFieldDecorators('note', bdConfig.Book.dbFields.note)
	note: null | string
}
