import { Field, InputType } from '@nestjs/graphql'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class GetSentenceAndPhraseAnalysesInput {
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
