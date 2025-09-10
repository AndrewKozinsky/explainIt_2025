import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from '../../../db/dbConfig/dbConfig'
import { DtoFieldDecorators } from '../../../db/dtoFieldDecorators'

@InputType()
export class UpdateBookChapterInput {
	@Field(() => Int, { description: 'BookChapter id' })
	@DtoFieldDecorators('id', bdConfig.BookChapter.dbFields.id, { type: 'number', required: true, min: 1 })
	id: number

	@Field(() => String, { description: 'BookChapter name (chapter 1)', nullable: true })
	@DtoFieldDecorators('name', bdConfig.BookChapter.dbFields.name)
	name?: null | string

	@Field(() => String, { description: 'BookChapter header', nullable: true })
	@DtoFieldDecorators('header', bdConfig.BookChapter.dbFields.header)
	header?: null | string

	@Field(() => String, { description: 'BookChapter content', nullable: true })
	@DtoFieldDecorators('content', bdConfig.BookChapter.dbFields.content)
	content?: null | string

	@Field(() => String, { description: 'BookChapter note', nullable: true })
	@DtoFieldDecorators('note', bdConfig.BookChapter.dbFields.note)
	note?: null | string

	@Field(() => Boolean, { description: 'Should a program convert the content into a structure?', nullable: true })
	@DtoFieldDecorators('convertContentIntoStructure', {
		type: 'boolean',
		description: 'Should a program convert the content into a structure?',
		required: false,
	})
	convertContentIntoStructure?: boolean
}
