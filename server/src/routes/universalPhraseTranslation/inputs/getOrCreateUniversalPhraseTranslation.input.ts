import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { LanguageCode } from 'prisma/generated/enums'

@InputType()
export class GetOrCreateUniversalPhraseTranslationInput {
	@Field(() => Number, { description: 'UniversalPhrase id', nullable: true })
	@DtoFieldDecorators('universalPhraseId', bdConfig.UniversalPhrase.dbFields.id, { required: false })
	universalPhraseId?: number

	@Field(() => String, { description: 'Phrase text for automatic get-or-create UniversalPhrase', nullable: true })
	@DtoFieldDecorators('phraseText', bdConfig.UniversalPhrase.dbFields.text, { required: false })
	phraseText?: string

	@Field(() => String, {
		description: 'Source language code for automatic get-or-create UniversalPhrase',
		nullable: true,
	})
	@DtoFieldDecorators('sourceLanguageCode', bdConfig.UniversalPhrase.dbFields.source_language_code, {
		required: false,
	})
	sourceLanguageCode?: string

	@Field(() => String, { description: 'Target language code for translation' })
	@DtoFieldDecorators('targetLanguageCode', bdConfig.UniversalPhraseTranslation.dbFields.target_language_code)
	targetLanguageCode: LanguageCode

	@Field(() => String, { description: 'LLM provider name (deepseek, chatgpt, gemini)' })
	@DtoFieldDecorators('provider', bdConfig.UniversalPhraseTranslation.dtoProps.provider)
	provider: string
}
