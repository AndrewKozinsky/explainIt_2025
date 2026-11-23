import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import type { AiDialogueCefrLevel, AiDialogueMode } from 'features/aiDialogue/aiDialogueLanguageLevel'
import { PaginatedOutModel } from 'models/pagination/paginated.out.model'
import type { Language } from 'utils/languages'

const fields = bdConfig.AiDialogue.dtoProps

export class AiDialogueLastMessageOutModel {
	@ApiProperty({ ...getApiPropertyOptions(bdConfig.AiDialogueCharacter.dbFields.name), required: true })
	name: string | null

	@ApiProperty({ ...getApiPropertyOptions(bdConfig.AiDialogueCharacter.dbFields.role), required: true })
	role: string | null

	@ApiProperty(getApiPropertyOptions(fields.lastMessageText))
	text: string

	@ApiProperty({ ...getApiPropertyOptions(fields.lastMessageTextType), required: true })
	textType: 'speech' | 'action' | null

	@ApiProperty({ ...getApiPropertyOptions(fields.lastMessageAvatarUrl), required: true })
	avatarUrl: string | null
}

export class AiDialogueListExamOutModel {
	@ApiProperty(getApiPropertyOptions(fields.listExamStatus))
	status: 'inProgress' | 'passed' | 'failed'

	@ApiProperty({ ...getApiPropertyOptions(fields.listExamLevel), required: true })
	level: AiDialogueCefrLevel | null

	@ApiProperty({ ...getApiPropertyOptions(fields.listExamMedalUrl), required: true })
	medalUrl: string | null
}

export class AiDialogueListItemOutModel {
	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dbFields.id))
	id: number

	@ApiProperty({
		...getApiPropertyOptions(bdConfig.AiDialogueScenario.dbFields.title),
		description: 'Scenario title in the interface language',
	})
	scenarioTitle: string

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dbFields.source_language_code))
	sourceLanguageCode: Language

	@ApiProperty({ ...getApiPropertyOptions(bdConfig.AiDialogue.dbFields.cefr_level), required: true })
	cefrLevel: AiDialogueCefrLevel | null

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dbFields.mode))
	mode: AiDialogueMode

	@ApiProperty({ ...getApiPropertyOptions(fields.listSceneImageUrl), required: true })
	sceneImageUrl: string | null

	@ApiProperty({
		type: AiDialogueLastMessageOutModel,
		nullable: true,
		description: 'Последнее сообщение NPC в практике',
	})
	lastMessage: AiDialogueLastMessageOutModel | null

	@ApiProperty({ type: AiDialogueListExamOutModel, nullable: true, description: 'Статус и результат экзамена' })
	exam: AiDialogueListExamOutModel | null
}

export class AiDialoguesPageOutModel extends PaginatedOutModel<AiDialogueListItemOutModel> {
	@ApiProperty({ type: [AiDialogueListItemOutModel], description: 'Диалоги текущего пользователя' })
	items: AiDialogueListItemOutModel[]
}
