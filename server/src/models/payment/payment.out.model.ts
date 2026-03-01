import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BuySubscriptionWithYooKassaOutModel {
	@Field(() => String)
	confirmationUrl: string
}
