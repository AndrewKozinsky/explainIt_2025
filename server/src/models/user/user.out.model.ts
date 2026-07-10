import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

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
}
