import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TopUpBalanceWithYooKassaOutModel {
	@Field(() => String)
	confirmationUrl: string
}
