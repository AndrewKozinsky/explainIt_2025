import { ApiProperty } from '@nestjs/swagger'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { getApiPropertyOptions } from 'db/dtoFieldDecorators'

const $$ = bdConfig.Payment.dtoProps

export class CreateYooKassaPaymentOutModel {
	@ApiProperty(getApiPropertyOptions($$.confirmationUrl))
	confirmationUrl: string
}
