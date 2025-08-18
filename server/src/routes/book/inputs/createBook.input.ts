import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from '../../../db/dbConfig/dbConfig'
import { DtoFieldDecorators } from '../../../db/dtoFieldDecorators'

@InputType()
export class CreateBookInput {
	@Field({ description: 'Author' })
	@DtoFieldDecorators('author', bdConfig.Book.dbFields.author)
	author: string

	@Field({ description: 'Name' })
	@DtoFieldDecorators('name', bdConfig.Book.dbFields.name)
	name: string

	@Field({ description: 'Note' })
	@DtoFieldDecorators('note', bdConfig.Book.dbFields.note)
	note: string
}
