import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CreateYooKassaPaymentOutModel {
	@Field(() => String)
	confirmationUrl: string
}
