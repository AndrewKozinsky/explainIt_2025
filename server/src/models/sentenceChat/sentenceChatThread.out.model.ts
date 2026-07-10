import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { SentenceChatMessageOutModel } from './sentenceChatMessage.out.model'

const $ = bdConfig.SentenceChatThread.dbFields

export class SentenceChatThreadOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions(bdConfig.Sentence.dbFields.id))
	sentenceId: number

	@ApiProperty({ description: 'Chat messages in the thread', type: [SentenceChatMessageOutModel] })
	messages: SentenceChatMessageOutModel[]

	@ApiProperty(getApiPropertyOptions($.created_at))
	createdAt: string

	@ApiProperty(getApiPropertyOptions($.updated_at))
	updatedAt: string
}
