import { ApiProperty } from '@nestjs/swagger'
import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { AiDialogueMode, AiDialogueCefrLevel } from 'features/aiDialogue/aiDialogueLanguageLevel'
import { AiDialogueScenarioOutModel } from 'models/aiDialogueScenario/aiDialogueScenario.out.model'

const $ = bdConfig.AiDialogue.dbFields

export class AiDialogueOutModel {
	@ApiProperty(getApiPropertyOptions($.illustration_style_id))
	illustrationStyleId: string

	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty({ description: 'Scenario this dialogue follows', type: AiDialogueScenarioOutModel })
	scenario: AiDialogueScenarioOutModel

	@ApiProperty(getApiPropertyOptions($.source_language_code))
	sourceLanguageCode: Language

	@ApiProperty(getApiPropertyOptions($.target_language_code))
	targetLanguageCode: Language

	@ApiProperty({ ...getApiPropertyOptions($.cefr_level), required: true })
	cefrLevel: AiDialogueCefrLevel | null

	@ApiProperty(getApiPropertyOptions(bdConfig.AiDialogue.dbFields.mode))
	mode: AiDialogueMode

	@ApiProperty(getApiPropertyOptions($.created_at))
	createdAt: string

	@ApiProperty(getApiPropertyOptions($.updated_at))
	updatedAt: string
}
