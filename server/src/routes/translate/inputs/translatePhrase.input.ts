import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class TranslatePhraseInput {
	@Field(() => String, { description: 'Text for translation' })
	@DtoFieldDecorators('text', bdConfig.EngRusDictionary.dbFields.eng)
	text: string

	@Field(() => String, { description: 'Source language code', nullable: true })
	@DtoFieldDecorators('text', bdConfig.EngRusDictionary.dtoProps.sourceLanguageCode)
	sourceLanguageCode?: null | string

	@Field(() => String, { description: 'Target language code', nullable: true })
	@DtoFieldDecorators('text', bdConfig.EngRusDictionary.dtoProps.targetLanguageCode)
	targetLanguageCode?: null | string
}
