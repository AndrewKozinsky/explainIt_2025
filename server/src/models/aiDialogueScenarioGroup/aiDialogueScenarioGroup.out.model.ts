import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import { AiDialogueScenarioOutModel } from 'models/aiDialogueScenario/aiDialogueScenario.out.model'

const $ = bdConfig.AiDialogueScenarioGroup.dbFields
const $$ = bdConfig.AiDialogueScenario.dtoProps

export class PublicAiDialogueScenarioOutModel extends AiDialogueScenarioOutModel {
	@ApiProperty(getApiPropertyOptions($$.publicSlug))
	declare slug: string

	@ApiProperty(getApiPropertyOptions($$.coverUrl))
	coverUrl: string
}

export class AiDialogueScenarioGroupOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions($.slug))
	slug: string

	@ApiProperty({
		...getApiPropertyOptions($.title),
		description: 'Group title in the interface language',
		example: 'Travel abroad',
	})
	title: string

	@ApiProperty({
		...getApiPropertyOptions($.description),
		description: 'Why to choose a scenario from this group, in the interface language',
		example: 'Useful before a trip: get through passport control and check in to a hotel.',
	})
	description: string

	@ApiProperty({
		type: [PublicAiDialogueScenarioOutModel],
		description: 'All public scenarios in this group, newest first',
	})
	scenarios: PublicAiDialogueScenarioOutModel[]
}
