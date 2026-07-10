import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class RegisterUserInput {
	@DtoFieldDecorators('email', bdConfig.User.dbFields.email)
	email: string

	@DtoFieldDecorators('password', bdConfig.User.dtoProps.password)
	password: string
}
