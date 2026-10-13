import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import type { AiDialogueAudioAttemptStatus, AiDialogueAudioStatus } from 'prisma/generated/client'

const $ = bdConfig.AiDialogueAudioJob.dbFields
const $$ = bdConfig.AiDialogueAudioJob.dtoProps

export class AiDialogueAudioItemOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number
	@ApiProperty(getApiPropertyOptions($.attempt_id))
	attemptId: string
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueAudioAttempt.dbFields.turn_id))
	turnId: string
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueAudioAttempt.dbFields.status))
	attemptStatus: AiDialogueAudioAttemptStatus
	@ApiProperty(getApiPropertyOptions($.message_id))
	messageId: number | null
	@ApiProperty(getApiPropertyOptions($.event_index))
	eventIndex: number
	@ApiProperty(getApiPropertyOptions($.action_index))
	actionIndex: number
	@ApiProperty(getApiPropertyOptions($.npc_id))
	npcId: string | null
	@ApiProperty(getApiPropertyOptions($.status))
	status: AiDialogueAudioStatus
	@ApiProperty(getApiPropertyOptions($$.url))
	url: string | null
	@ApiProperty(getApiPropertyOptions($$.mimeType))
	mimeType: string
	@ApiProperty(getApiPropertyOptions($$.urlsExpireAt))
	urlsExpireAt: string | null
}

export class AiDialogueAudioAttemptOutModel {
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueAudioAttempt.dtoProps.attemptId))
	id: string
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueAudioAttempt.dbFields.turn_id))
	turnId: string
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueAudioAttempt.dbFields.status))
	status: AiDialogueAudioAttemptStatus
}

export class AiDialogueAudioOutModel {
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dbFields.id))
	dialogueId: number
	@ApiProperty({ type: [AiDialogueAudioAttemptOutModel], description: 'Попытки для восстановления и отмены превью' })
	attempts: AiDialogueAudioAttemptOutModel[]
	@ApiProperty({ type: [AiDialogueAudioItemOutModel], description: 'Отдельные реплики и описания сцен' })
	items: AiDialogueAudioItemOutModel[]
}
