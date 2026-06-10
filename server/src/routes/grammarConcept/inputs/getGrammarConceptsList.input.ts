import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class GetGrammarConceptsListInput {
	@Field(() => String, { description: 'Source language code (language being learned)' })
	@DtoFieldDecorators('sourceLanguage', bdConfig.GrammarConcept.dbFields.source_language_code)
	sourceLanguage: string

	@Field(() => String, { description: 'Target language code (translation language)' })
	@DtoFieldDecorators('targetLanguage', bdConfig.GrammarConcept.dbFields.target_language_code)
	targetLanguage: string
}
