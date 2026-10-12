import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import type { UserGender } from 'prisma/generated/client'

export class AvatarPresetOutModel {
	@ApiProperty(getApiPropertyOptions(bdConfig.User.dtoProps.avatarPresetId))
	id: string

	@ApiProperty(getApiPropertyOptions(bdConfig.User.dbFields.gender))
	gender: UserGender

	@ApiProperty(getApiPropertyOptions(bdConfig.User.dtoProps.avatarUrl))
	avatarUrl: string

	@ApiProperty(getApiPropertyOptions(bdConfig.User.dtoProps.avatarUrlExpiresAt))
	avatarUrlExpiresAt: string
}
