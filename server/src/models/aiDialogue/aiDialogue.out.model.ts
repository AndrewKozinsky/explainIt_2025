import { ApiProperty } from '@nestjs/swagger'
import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { AiDialogueScenarioOutModel } from 'models/aiDialogueScenario/aiDialogueScenario.out.model'

const $ = bdConfig.AiDialogue.dbFields

export class AiDialogueOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty({ description: 'Scenario this dialogue follows', type: AiDialogueScenarioOutModel })
	scenario: AiDialogueScenarioOutModel

	@ApiProperty(getApiPropertyOptions($.target_language_code))
	targetLanguageCode: Language

	@ApiProperty(getApiPropertyOptions($.created_at))
	createdAt: string

	@ApiProperty(getApiPropertyOptions($.updated_at))
	updatedAt: string
}
