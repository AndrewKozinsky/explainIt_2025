import { Field, InputType } from '@nestjs/graphql'
import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class GetUniversalPhraseInput {
	@Field(() => String, { description: 'Phrase or sentence text' })
	@DtoFieldDecorators('text', bdConfig.UniversalPhrase.dbFields.text)
	text: string

	@Field(() => String, { description: 'Source language code' })
	@DtoFieldDecorators('sourceLanguageCode', bdConfig.UniversalPhrase.dbFields.source_language_code)
	sourceLanguageCode: Language
}
