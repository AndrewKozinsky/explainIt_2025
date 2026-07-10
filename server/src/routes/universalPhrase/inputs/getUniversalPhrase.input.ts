import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class GetUniversalPhraseInput {
	@DtoFieldDecorators('text', bdConfig.UniversalPhrase.dbFields.text)
	text: string

	@DtoFieldDecorators('sourceLanguageCode', bdConfig.UniversalPhrase.dbFields.source_language_code)
	sourceLanguageCode: Language
}
