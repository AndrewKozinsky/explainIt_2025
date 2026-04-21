import { Field, InputType, Int } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class CreateSentenceChatThreadInput {
	@Field(() => Int, { description: 'Sentence id' })
	@DtoFieldDecorators('sentenceId', bdConfig.Sentence.dbFields.id)
	sentenceId: number
}
