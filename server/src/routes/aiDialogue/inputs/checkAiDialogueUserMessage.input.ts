import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

const $ = bdConfig.AiDialogue.dtoProps

export class CheckAiDialogueUserMessageInput {
	@DtoFieldDecorators('speech', $.checkUserMessageSpeechPart)
	speech?: string | null

	@DtoFieldDecorators('action', $.checkUserMessageActionPart)
	action?: string | null
}
