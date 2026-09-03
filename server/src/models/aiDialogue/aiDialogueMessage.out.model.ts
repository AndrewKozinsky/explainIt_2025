import { ApiProperty } from '@nestjs/swagger'
import { AiDialogueEvent } from 'types/aiDialogueMessage'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.AiDialogueMessage.dbFields

export class AiDialogueMessageOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
		id: number

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dbFields.id))
		dialogueId: number

	@ApiProperty({ description: 'Event payload (discriminated by its type field)' })
		payload: AiDialogueEvent

	@ApiProperty(getApiPropertyOptions($.created_at))
		createdAt: string
}
