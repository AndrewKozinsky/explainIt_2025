import { Field, InputType, Int } from '@nestjs/graphql'
import { IsArray, IsString } from 'class-validator'
import { DtoFieldDecorators } from 'src/db/dtoFieldDecorators'

@InputType()
export class TranslateSentencesInput {
	@Field(() => String, { description: 'Book author', nullable: true })
	@DtoFieldDecorators('bookAuthor', {
		type: 'string',
		description: 'Name of the author book',
		required: false,
	})
		bookAuthor: null | string

	@Field(() => String, { description: 'Book name', nullable: true })
	@DtoFieldDecorators('bookAuthor', {
		type: 'string',
		description: 'Name of the book',
		required: false,
	})
		bookName: null | string

	@Field(() => [String], { description: 'Array of sentences' })
	@IsArray()
	@IsString({ each: true })
		sentences: string[]
}
