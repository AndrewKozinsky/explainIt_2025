import { CefrSimplificationLevel } from 'utils/proficiencyLevel'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class UpdateAiDialogueInput {
	@DtoFieldDecorators('maxCefrLevel', bdConfig.AiDialogue.dbFields.max_cefr_level)
	maxCefrLevel?: CefrSimplificationLevel | null
}
