import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class ResendConfirmationEmailInput {
	@DtoFieldDecorators('email', bdConfig.User.dbFields.email)
	email: string
}
