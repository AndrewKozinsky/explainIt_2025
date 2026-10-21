import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $ = bdConfig.AiDialogue.dtoProps

/** Критическая ошибка в реплике или действии из черновика сообщения пользователя. */
export class AiDialogueUserMessageCriticalIssueOutModel {
	@ApiProperty(getApiPropertyOptions($.checkUserMessageIssueTitle))
	title: string

	@ApiProperty(getApiPropertyOptions($.checkUserMessageIssueSentence))
	sentenceMarkdown: string

	@ApiProperty(getApiPropertyOptions($.checkUserMessageIssueExplanation))
	explanationMarkdown: string
}

/** Необязательная рекомендация по тексту пользовательской реплики или действия. */
export class AiDialogueUserMessageSuggestionOutModel {
	@ApiProperty(getApiPropertyOptions($.checkUserMessageIssueExplanation))
	explanationMarkdown: string

	@ApiProperty(getApiPropertyOptions($.checkUserMessageIssueExample))
	example: string
}

/** Результат проверки одной части пользовательского сообщения: реплики либо действия. */
export class AiDialogueUserMessagePartCheckOutModel {
	@ApiProperty({ type: [AiDialogueUserMessageCriticalIssueOutModel], description: 'Ошибки, требующие исправления.' })
	critical: AiDialogueUserMessageCriticalIssueOutModel[]

	@ApiProperty({ type: [AiDialogueUserMessageSuggestionOutModel], description: 'Необязательные рекомендации.' })
	suggestions: AiDialogueUserMessageSuggestionOutModel[]
}

/** Проверка черновика сообщения пользователя; к сообщениям NPC эта модель не относится. */
export class AiDialogueUserMessageCheckOutModel {
	@ApiProperty({ type: AiDialogueUserMessagePartCheckOutModel, description: 'Результат проверки реплики.' })
	speech: AiDialogueUserMessagePartCheckOutModel

	@ApiProperty({ type: AiDialogueUserMessagePartCheckOutModel, description: 'Результат проверки действия.' })
	action: AiDialogueUserMessagePartCheckOutModel
}
