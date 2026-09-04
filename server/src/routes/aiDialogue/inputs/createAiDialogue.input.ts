import { Language } from 'utils/languages'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class CreateAiDialogueInput {
	@DtoFieldDecorators('scenarioId', bdConfig.AiDialogueScenario.dbFields.id)
		scenarioId: number

	// Колонка в БД nullable (для совместимости со старыми записями), но при создании
	// диалога язык перевода обязателен — без фолбэка на какой-либо язык по умолчанию.
	@DtoFieldDecorators('targetLanguageCode', bdConfig.AiDialogue.dbFields.target_language_code, { required: true })
		targetLanguageCode: Language
}
