import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

export class ConfirmEmailInput {
	@DtoFieldDecorators('code', bdConfig.User.dbFields.email_confirmation_code, { required: true })
	code: string
}
