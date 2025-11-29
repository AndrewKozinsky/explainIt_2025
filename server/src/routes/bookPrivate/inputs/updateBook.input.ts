import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class UpdateBookInput {
	@Field(() => Int, { description: 'Book id' })
	@DtoFieldDecorators('id', bdConfig.BookPrivate.dbFields.id, { type: 'number', required: true, min: 1 })
	id: number

	@Field(() => String, { description: 'Author', nullable: true })
	@DtoFieldDecorators('author', bdConfig.BookPrivate.dbFields.author)
	author?: null | string

	@Field(() => String, { description: 'Name', nullable: true })
	@DtoFieldDecorators('name', bdConfig.BookPrivate.dbFields.name)
	name?: null | string

	@Field(() => String, { description: 'Note', nullable: true })
	@DtoFieldDecorators('note', bdConfig.BookPrivate.dbFields.note)
	note?: null | string
}
