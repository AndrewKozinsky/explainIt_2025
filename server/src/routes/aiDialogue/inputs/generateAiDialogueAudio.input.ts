import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

const $ = bdConfig.AiDialogueAudio.dbFields

export class GenerateAiDialogueAudioInput {
	@DtoFieldDecorators('messageId', $.message_id)
	messageId: number

	@DtoFieldDecorators('actionIndex', $.action_index)
	actionIndex: number
}
