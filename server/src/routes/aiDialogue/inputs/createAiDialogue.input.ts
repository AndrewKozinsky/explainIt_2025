import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { AiDialogueMode, AiDialogueCefrLevel } from 'features/aiDialogue/aiDialogueLanguageLevel'

export class CreateAiDialogueInput {
	@DtoFieldDecorators('mode', bdConfig.AiDialogue.dbFields.mode, { required: false })
	mode?: AiDialogueMode | null

	@DtoFieldDecorators('illustrationStyleId', bdConfig.AiDialogue.dbFields.illustration_style_id, { required: false })
	illustrationStyleId?: string | null

	@DtoFieldDecorators('cefrLevel', bdConfig.AiDialogue.dbFields.cefr_level)
	cefrLevel?: AiDialogueCefrLevel | null

	@DtoFieldDecorators('scenarioId', bdConfig.AiDialogueScenario.dbFields.id)
	scenarioId: number

	@DtoFieldDecorators('userScenarioAmendment', bdConfig.AiDialogue.dbFields.user_scenario_amendment)
	userScenarioAmendment?: string | null

	@DtoFieldDecorators('sourceLanguageCode', bdConfig.AiDialogue.dbFields.source_language_code)
	sourceLanguageCode: Language

	@DtoFieldDecorators('targetLanguageCode', bdConfig.AiDialogue.dbFields.target_language_code)
	targetLanguageCode: Language
}
