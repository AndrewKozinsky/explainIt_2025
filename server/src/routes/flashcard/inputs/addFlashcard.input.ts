import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class AddFlashcardInput {
	@DtoFieldDecorators('sentencePhraseTranslationId', bdConfig.SentencePhraseTranslation.dbFields.id)
	sentencePhraseTranslationId: number
}
