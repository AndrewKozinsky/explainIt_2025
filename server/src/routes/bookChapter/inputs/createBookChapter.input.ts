import { Field, InputType, Int } from '@nestjs/graphql'
import { IsIn } from 'class-validator'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class CreateBookChapterInput {
	@Field(() => String, { description: 'Book type: public or private' })
	@IsIn(['public', 'private'], { message: 'Book type must be one of: public, private' })
	bookType: 'public' | 'private'

	@Field(() => Int, { description: 'Book id' })
	@DtoFieldDecorators('id', bdConfig.Book.dbFields.id, { type: 'number', required: true, min: 1 })
	bookId: number

	@Field(() => String, { description: 'Name on the chapter (chapter 1)', nullable: true })
	@DtoFieldDecorators('name', bdConfig.BookChapter.dbFields.name)
	name: null | string

	@Field(() => String, { description: 'Header on the chapter', nullable: true })
	@DtoFieldDecorators('name', bdConfig.BookChapter.dbFields.header)
	header: null | string

	@Field(() => String, { description: 'Content of the chapter', nullable: true })
	@DtoFieldDecorators('name', bdConfig.BookChapter.dbFields.content)
	content: null | string

	@Field(() => String, { description: 'Note about this chapter', nullable: true })
	@DtoFieldDecorators('note', bdConfig.BookChapter.dbFields.note)
	note: null | string
}
