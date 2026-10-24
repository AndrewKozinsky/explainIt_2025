import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import type { AiDialogueCefrLevel } from 'features/aiDialogue/aiDialogueLanguageLevel'
import { PaginatedOutModel } from 'models/pagination/paginated.out.model'
import type { ImageGenerationJobStatus } from 'prisma/generated/client'
import { AiDialogueImageOutModel } from './aiDialogueVisuals.out.model'
import type { Language } from 'utils/languages'

export class AiDialogueListScenarioOutModel {
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueScenario.dbFields.id))
	id: number

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueScenario.dbFields.title))
	title: string
}

/** Последнее сохранённое npcActions, включая старые сообщения без character_id. */
export class AiDialogueLastMessageOutModel {
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueMessage.dbFields.id))
	id: number

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dtoProps.lastMessageNpcId))
	npcId: string | null

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueCharacter.dbFields.name))
	name: string | null

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueCharacter.dbFields.role))
	role: string | null

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dtoProps.lastMessageText))
	text: string

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dtoProps.lastMessageTextType))
	textType: 'speech' | 'action' | null

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueMessage.dbFields.created_at))
	createdAt: string
}

/** npcId идентифицирует и старых NPC, ещё не имеющих записи AiDialogueCharacter. */
export class AiDialogueListCharacterOutModel {
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueCharacter.dbFields.npc_id))
	npcId: string

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueCharacter.dbFields.name))
	name: string | null

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueCharacter.dbFields.role))
	role: string | null

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogueCharacter.dtoProps.generationStatus))
	generationStatus: ImageGenerationJobStatus | null

	@ApiProperty({ type: AiDialogueImageOutModel, nullable: true, description: 'Готовый спрайт NPC или null' })
	emotionSheet: AiDialogueImageOutModel | null
}

export class AiDialogueListItemOutModel {
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dbFields.id))
	id: number

	@ApiProperty({ type: AiDialogueListScenarioOutModel, description: 'Сценарий диалога' })
	scenario: AiDialogueListScenarioOutModel

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dbFields.source_language_code))
	sourceLanguageCode: Language

	@ApiProperty({ ...getApiPropertyOptions(bdConfig.AiDialogue.dbFields.max_cefr_level), required: true })
	maxCefrLevel: AiDialogueCefrLevel | null

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dbFields.created_at))
	createdAt: string

	@ApiProperty({ type: AiDialogueLastMessageOutModel, nullable: true, description: 'Последнее сообщение NPC' })
	lastMessage: AiDialogueLastMessageOutModel | null

	@ApiProperty({ type: AiDialogueImageOutModel, nullable: true, description: 'Готовая иллюстрация последней сцены' })
	sceneImage: AiDialogueImageOutModel | null

	@ApiProperty({ type: [AiDialogueListCharacterOutModel], description: 'Все NPC за всю историю диалога' })
	characters: AiDialogueListCharacterOutModel[]
}

export class AiDialoguesPageOutModel extends PaginatedOutModel<AiDialogueListItemOutModel> {
	@ApiProperty({ type: [AiDialogueListItemOutModel], description: 'Диалоги текущего пользователя' })
	items: AiDialogueListItemOutModel[]

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dtoProps.visualUrlsExpireAt))
	urlsExpireAt: string
}
