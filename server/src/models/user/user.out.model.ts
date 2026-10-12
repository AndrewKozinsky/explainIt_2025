import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'
import type { UserGender } from 'prisma/generated/client'

const $ = bdConfig.User.dbFields

export class UserOutModel {
	@ApiProperty(getApiPropertyOptions($.id))
	id: number

	@ApiProperty(getApiPropertyOptions($.email))
	email: string

	@ApiProperty(getApiPropertyOptions($.is_user_confirmed))
	isUserConfirmed: boolean

	@ApiProperty(getApiPropertyOptions($.balance))
	balance: number

	@ApiProperty(getApiPropertyOptions($.gender))
	gender: UserGender

	@ApiProperty(getApiPropertyOptions($.avatar_preset_id))
	avatarPresetId: string | null

	@ApiProperty(getApiPropertyOptions(bdConfig.User.dtoProps.avatarUrl))
	avatarUrl: string

	@ApiProperty(getApiPropertyOptions(bdConfig.User.dtoProps.avatarUrlExpiresAt))
	avatarUrlExpiresAt: string
}
