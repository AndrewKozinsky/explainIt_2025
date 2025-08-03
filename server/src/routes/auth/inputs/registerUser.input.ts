import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from '../../../db/dbConfig/dbConfig'
import { DtoFieldDecorators } from '../../../db/dtoFieldDecorators'

@InputType()
export class RegisterUserInput {
	@Field({ description: 'User email' })
	@DtoFieldDecorators('email', bdConfig.User.dbFields.email)
	email: string

	@Field({ description: 'User password' })
	@DtoFieldDecorators('password', bdConfig.User.dtoProps.password)
	password?: string
}
