import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'
import type { UserGender } from 'prisma/generated/client'

export class UpdateUserProfileDto {
	@DtoFieldDecorators('gender', bdConfig.User.dbFields.gender, { required: false })
	gender?: UserGender

	@DtoFieldDecorators('avatarPresetId', bdConfig.User.dtoProps.avatarPresetId, { required: false })
	avatarPresetId?: string
}
