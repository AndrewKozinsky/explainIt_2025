import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import type { ImageGenerationJobStatus } from 'prisma/generated/client'

export class AiDialogueImageOutModel {
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueImage.dbFields.id))
	id: number

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueImage.dtoProps.url))
	url: string

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueImage.dbFields.mime_type))
	mimeType: string

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueImage.dbFields.width))
	width: number

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueImage.dbFields.height))
	height: number

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueImage.dbFields.layout_version))
	layoutVersion: string | null
}

export class AiDialogueCharacterVisualOutModel {
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueCharacter.dbFields.id))
	id: number
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueCharacter.dbFields.npc_id))
	npcId: string
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueCharacter.dbFields.name))
	name: string | null
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueCharacter.dbFields.role))
	role: string | null
	@ApiProperty({
		...getApiPropertyOptions(bdConfig.AiDialogueCharacter.dtoProps.generationStatus),
		enum: bdConfig.AiDialogueCharacter.dtoProps.generationStatus.variants,
	})
	generationStatus: ImageGenerationJobStatus | null
	@ApiProperty({ type: AiDialogueImageOutModel, nullable: true, description: 'Готовый лист эмоций NPC' })
	emotionSheet: AiDialogueImageOutModel | null
}

export class AiDialogueSceneVisualOutModel {
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueMessage.dbFields.id))
	messageId: number

	@ApiProperty({
		...getApiPropertyOptions(bdConfig.AiDialogueImage.dtoProps.generationStatus),
		enum: bdConfig.AiDialogueImage.dtoProps.generationStatus.variants,
	})
	generationStatus: ImageGenerationJobStatus | null

	@ApiProperty({ type: AiDialogueImageOutModel, nullable: true, description: 'Готовая иллюстрация сцены' })
	image: AiDialogueImageOutModel | null
}

export class AiDialogueVisualsOutModel {
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dbFields.id))
	dialogueId: number
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dtoProps.userAvatarUrl))
	userAvatarUrl: string
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dtoProps.visualUrlsExpireAt))
	urlsExpireAt: string
	@ApiProperty({ type: [AiDialogueCharacterVisualOutModel], description: 'NPC диалога и их спрайты' })
	characters: AiDialogueCharacterVisualOutModel[]
	@ApiProperty({ type: [AiDialogueSceneVisualOutModel], description: 'Сцены по идентификаторам сообщений' })
	scenes: AiDialogueSceneVisualOutModel[]
}
