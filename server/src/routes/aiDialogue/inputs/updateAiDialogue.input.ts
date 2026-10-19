import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { AiDialogueCefrLevel } from 'features/aiDialogue/aiDialogueLanguageLevel'

export class UpdateAiDialogueInput {
	@DtoFieldDecorators('maxCefrLevel', bdConfig.AiDialogue.dbFields.max_cefr_level)
	maxCefrLevel?: AiDialogueCefrLevel | null
}
