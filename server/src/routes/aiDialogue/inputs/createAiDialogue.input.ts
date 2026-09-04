import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class CreateAiDialogueInput {
	@DtoFieldDecorators('scenarioId', bdConfig.AiDialogueScenario.dbFields.id)
	scenarioId: number

	@DtoFieldDecorators('targetLanguageCode', bdConfig.AiDialogue.dbFields.target_language_code)
	targetLanguageCode: Language
}
