import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { AiDialogueCefrLevel } from 'features/aiDialogue/aiDialogueLanguageLevel'

export class CreateAiDialogueInput {
	@DtoFieldDecorators('maxCefrLevel', bdConfig.AiDialogue.dbFields.max_cefr_level)
	maxCefrLevel?: AiDialogueCefrLevel | null

	@DtoFieldDecorators('scenarioId', bdConfig.AiDialogueScenario.dbFields.id)
	scenarioId: number

	@DtoFieldDecorators('sourceLanguageCode', bdConfig.AiDialogue.dbFields.source_language_code)
	sourceLanguageCode: Language

	@DtoFieldDecorators('targetLanguageCode', bdConfig.AiDialogue.dbFields.target_language_code)
	targetLanguageCode: Language
}
