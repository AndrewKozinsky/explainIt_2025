import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsIn, IsString, ValidateIf, ValidateNested } from 'class-validator'
import { errorMessage, serializeErrorMessage } from 'infrastructure/exceptions/errorMessage'
import { Trim } from 'infrastructure/pipes/Trim.decorator'

export class AiDialogueActionItemInput {
	@ApiProperty({ enum: ['action', 'speech'], description: 'Вид элемента: действие или реплика' })
	@IsIn(['action', 'speech'], { message: serializeErrorMessage(errorMessage.mustBeEnumValue('Type')) })
	type: 'action' | 'speech'

	@ApiProperty({ description: 'Текст действия или реплики' })
	@IsString({ message: serializeErrorMessage(errorMessage.mustBeString('Content')) })
	@Trim()
	content: string
}

export class CreateAiDialogueMessageInput {
	@ApiProperty({ enum: ['userActions', 'userAvoidsNPC'], description: 'Тип события, отправляемого клиентом' })
	@IsIn(['userActions', 'userAvoidsNPC'], {
		message: serializeErrorMessage(errorMessage.mustBeEnumValue('Type')),
	})
	type: 'userActions' | 'userAvoidsNPC'

	@ApiProperty({
		type: [AiDialogueActionItemInput],
		required: false,
		description: 'Действия и реплики пользователя (только для типа userActions)',
	})
	@ValidateIf((input) => input.type === 'userActions')
	@IsArray({ message: serializeErrorMessage(errorMessage.mustBeArray('Actions')) })
	@ArrayNotEmpty({ message: serializeErrorMessage(errorMessage.mustBeArray('Actions')) })
	@ValidateNested({ each: true })
	@Type(() => AiDialogueActionItemInput)
	actions?: AiDialogueActionItemInput[]
}
