import { Field, InputType } from '@nestjs/graphql'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class TranslatePhraseInput {
	@Field(() => String, { description: 'Text for translation' })
	@DtoFieldDecorators('text', {
		type: 'string',
		required: true,
		minLength: 1,
		maxLength: 100,
	})
	text: string

	@Field(() => String, { description: 'Source language code', nullable: true })
	@DtoFieldDecorators('sourceLanguageCode', {
		type: 'string',
		required: false,
		minLength: 2,
		maxLength: 2,
	})
	sourceLanguageCode?: null | string

	@Field(() => String, { description: 'Target language code', nullable: true })
	@DtoFieldDecorators('targetLanguageCode', {
		type: 'string',
		required: false,
		minLength: 2,
		maxLength: 2,
	})
	targetLanguageCode?: null | string
}
