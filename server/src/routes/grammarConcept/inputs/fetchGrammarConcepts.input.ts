import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class FetchGrammarConceptsInput {
	@Field(() => String)
	@DtoFieldDecorators('sentenceText', bdConfig.UniversalPhrase.dbFields.text)
	sentenceText: string

	@Field(() => String)
	@DtoFieldDecorators('sourceLanguage', bdConfig.GrammarConcept.dbFields.source_language_code)
	sourceLanguage: string

	@Field(() => String)
	@DtoFieldDecorators('targetLanguage', bdConfig.GrammarConcept.dbFields.target_language_code)
	targetLanguage: string
}
