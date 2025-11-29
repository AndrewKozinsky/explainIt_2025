import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class TopUpBalanceWithYooKassaInput {
	// Amount in kopecks
	@Field({ description: 'Money amount in kopecks' })
	@DtoFieldDecorators('amount', bdConfig.Payment.dbFields.amount)
	amount: number
}
