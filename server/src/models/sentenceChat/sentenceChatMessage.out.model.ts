import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.SentenceChatMessage.dbFields

export class SentenceChatMessageOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions(bdConfig.SentenceChatThread.dbFields.id))
	threadId: number

	@ApiProperty(getApiPropertyOptions($.role))
	role: 'user' | 'assistant'

	@ApiProperty(getApiPropertyOptions($.content))
	content: string

	@ApiProperty(getApiPropertyOptions($.status))
	status: 'streaming' | 'completed' | 'canceled' | 'failed'

	@ApiProperty(getApiPropertyOptions($.error_message))
	errorMessage: null | string

	@ApiProperty(getApiPropertyOptions($.created_at))
	createdAt: string

	@ApiProperty(getApiPropertyOptions($.updated_at))
	updatedAt: string
}
