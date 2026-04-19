import { Field, InputType } from '@nestjs/graphql'
import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class GetUniversalPhraseInput {
	@Field(() => String, { description: 'Phrase text' })
	@DtoFieldDecorators('phrase', bdConfig.UniversalPhrase.dbFields.phrase, { type: 'string', required: true })
	phrase: string

	@Field(() => String, { description: 'Language code' })
	@DtoFieldDecorators('languageCode', bdConfig.UniversalPhrase.dbFields.language_code, { type: 'enum', required: true })
	languageCode: Language
}
