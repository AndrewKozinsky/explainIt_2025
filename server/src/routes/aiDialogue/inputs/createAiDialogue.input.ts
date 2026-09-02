import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class CreateAiDialogueInput {
	@DtoFieldDecorators('scenarioId', bdConfig.AiDialogueScenario.dbFields.id)
	scenarioId: number
}
