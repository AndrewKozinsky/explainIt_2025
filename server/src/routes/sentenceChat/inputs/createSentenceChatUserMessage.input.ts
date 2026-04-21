import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class CreateSentenceChatUserMessageInput {
	@Field(() => Int, { description: 'Sentence chat thread id' })
	@DtoFieldDecorators('text', bdConfig.SentenceChatThread.dbFields.id)
	threadId: number

	@Field(() => String, { description: 'User question in markdown-free plain text' })
	@DtoFieldDecorators('text', bdConfig.SentenceChatMessage.dbFields.content)
	question: string
}
