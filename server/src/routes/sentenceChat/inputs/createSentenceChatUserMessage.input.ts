import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class CreateSentenceChatUserMessageInput {
	@DtoFieldDecorators('text', bdConfig.SentenceChatThread.dbFields.id)
	threadId: number

	@DtoFieldDecorators('text', bdConfig.SentenceChatMessage.dbFields.content)
	question: string
}
