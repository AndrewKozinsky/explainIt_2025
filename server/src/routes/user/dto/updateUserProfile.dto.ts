import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsObject, ValidateIf, ValidateNested } from 'class-validator'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import { UserPreferencesDto } from 'models/user/userPreferences.dto'
import type { UserGender } from 'prisma/generated/client'

export class UpdateUserProfileDto {
	@DtoFieldDecorators('gender', bdConfig.User.dbFields.gender, { required: false })
	gender?: UserGender

	@DtoFieldDecorators('avatarPresetId', bdConfig.User.dtoProps.avatarPresetId, { required: false })
	avatarPresetId?: null | string

	@ApiPropertyOptional({ type: UserPreferencesDto })
	@ValidateIf((_profile, value) => value !== undefined)
	@IsObject()
	@ValidateNested()
	@Type(() => UserPreferencesDto)
	preferences?: UserPreferencesDto
}
