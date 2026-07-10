import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { LanguageCode } from 'prisma/generated/enums'

export class GetOrCreateUniversalPhraseTranslationInput {
	@DtoFieldDecorators('universalPhraseId', bdConfig.UniversalPhrase.dbFields.id, { required: false })
	universalPhraseId?: number

	@DtoFieldDecorators('phraseText', bdConfig.UniversalPhrase.dbFields.text, { required: false })
	phraseText?: string

	@DtoFieldDecorators('sourceLanguageCode', bdConfig.UniversalPhrase.dbFields.source_language_code, {
		required: false,
	})
	sourceLanguageCode?: string

	@DtoFieldDecorators('targetLanguageCode', bdConfig.UniversalPhraseTranslation.dbFields.target_language_code)
	targetLanguageCode: LanguageCode

	@DtoFieldDecorators('provider', bdConfig.UniversalPhraseTranslation.dtoProps.provider)
	provider: string
}
