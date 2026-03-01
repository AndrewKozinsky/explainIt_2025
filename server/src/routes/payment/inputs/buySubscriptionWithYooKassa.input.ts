import { Field, InputType } from '@nestjs/graphql'
import { bdConfig } from 'db/dbConfig/dbConfig'
import { DtoFieldDecorators } from 'db/dtoFieldDecorators'

@InputType()
export class BuySubscriptionWithYooKassaInput {
	@Field({ description: 'Tariff id' })
	@DtoFieldDecorators('tariffId', bdConfig.UserSubscription.dbFields.tariff_id)
	tariffId: number
}
