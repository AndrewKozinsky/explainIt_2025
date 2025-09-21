import { Field, InputType } from '@nestjs/graphql'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class AnalyseSentenceAndPhraseInput {
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

	@Field(() => String, { description: 'Context' })
	@DtoFieldDecorators('context', {
		type: 'string',
		description: 'Context of the sentence or phrase',
		required: true,
	})
	context: string

	@Field(() => String, { description: 'Sentence' })
	@DtoFieldDecorators('sentence', {
		type: 'string',
		description: 'Sentence for translation',
		required: true,
	})
	sentence: string

	@Field(() => String, { description: 'Phrase' })
	@DtoFieldDecorators('phrase', {
		type: 'string',
		description: 'Phase from sentence for translation',
		required: true,
	})
	phrase: string
}
