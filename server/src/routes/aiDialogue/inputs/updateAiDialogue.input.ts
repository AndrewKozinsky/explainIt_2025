import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { AiDialogueCefrLevel } from 'features/aiDialogue/aiDialogueLanguageLevel'

export class UpdateAiDialogueInput {
	@DtoFieldDecorators('cefrLevel', bdConfig.AiDialogue.dbFields.cefr_level)
	cefrLevel?: AiDialogueCefrLevel | null
}
