import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
	ArrayMaxSize,
	ArrayNotEmpty,
	IsArray,
	IsIn,
	IsNotEmpty,
	IsObject,
	IsString,
	IsUUID,
	MaxLength,
	ValidateIf,
	ValidateNested,
} from 'class-validator'
import { errorMessage, serializeErrorMessage } from 'infrastructure/exceptions/errorMessage'
import { Trim } from 'infrastructure/pipes/Trim.decorator'

export class AiDialogueActionItemInput {
	@ApiProperty({ enum: ['action', 'speech'], description: 'Вид элемента: действие или реплика' })
	@IsIn(['action', 'speech'], { message: serializeErrorMessage(errorMessage.mustBeEnumValue('Type')) })
	type: 'action' | 'speech'

	@ApiProperty({ description: 'Текст действия или реплики' })
	@IsString({ message: serializeErrorMessage(errorMessage.mustBeString('Content')) })
	@IsNotEmpty()
	@MaxLength(4_000)
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
	@ArrayMaxSize(8)
	@IsObject({ each: true })
	@ValidateNested({ each: true })
	@Type(() => AiDialogueActionItemInput)
	actions?: AiDialogueActionItemInput[]

	@ApiPropertyOptional({ format: 'uuid', description: 'Use the same ID when retrying the same message.' })
	@ValidateIf((_, value) => value !== undefined)
	@IsUUID()
	requestId?: string
}
