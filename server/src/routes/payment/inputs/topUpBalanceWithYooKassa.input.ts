import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from '../../../db/dbConfig/dbConfig'
import { DtoFieldDecorators } from '../../../db/dtoFieldDecorators'

@InputType()
export class TopUpBalanceWithYooKassaInput {
	@Field({ description: 'Money amount' })
	@DtoFieldDecorators('amount', bdConfig.Payment.dbFields.amount)
	amount: number
}
