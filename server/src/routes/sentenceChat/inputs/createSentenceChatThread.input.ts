import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class CreateSentenceChatThreadInput {
	@DtoFieldDecorators('sentenceId', bdConfig.Sentence.dbFields.id)
	sentenceId: number
}
