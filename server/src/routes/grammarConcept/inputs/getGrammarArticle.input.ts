import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class GetGrammarArticleInput {
	@Field(() => String, { description: 'Source language code' })
	@DtoFieldDecorators('sourceLanguage', bdConfig.GrammarConcept.dbFields.source_language_code)
	sourceLanguage: string

	@Field(() => String, { description: 'Target language code' })
	@DtoFieldDecorators('targetLanguage', bdConfig.GrammarConcept.dbFields.target_language_code)
	targetLanguage: string

	@Field(() => String, { description: 'Grammar category' })
	@DtoFieldDecorators('category', bdConfig.GrammarConcept.dbFields.category)
	category: string

	@Field(() => String, { description: 'Article slug' })
	@DtoFieldDecorators('slug', bdConfig.GrammarConcept.dbFields.slug)
	slug: string
}
