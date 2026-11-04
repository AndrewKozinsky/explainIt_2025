import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.AiDialogueScenario.dbFields

export class AiDialogueScenarioOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions($.slug))
	slug: null | string

	@ApiProperty({ ...getApiPropertyOptions($.title), description: 'Scenario title in the interface language' })
	title: string

	@ApiProperty({
		...getApiPropertyOptions($.description),
		description: 'Short scenario description in the interface language',
	})
	description: string
}
