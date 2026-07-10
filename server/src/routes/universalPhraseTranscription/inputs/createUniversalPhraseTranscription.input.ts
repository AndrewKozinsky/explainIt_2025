import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class CreateUniversalPhraseTranscriptionInput {
	@DtoFieldDecorators('universalPhraseId', bdConfig.UniversalPhrase.dbFields.id)
	universalPhraseId: number
}
