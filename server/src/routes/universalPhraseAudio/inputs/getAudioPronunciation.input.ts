import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class GetUniversalPhraseAudioInput {
	@DtoFieldDecorators('universalPhraseId', bdConfig.UniversalPhrase.dbFields.id)
	universalPhraseId: number
}
