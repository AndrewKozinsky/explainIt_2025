import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CurrentSubscriptionOutModel {
	@Field(() => Int)
	tariffId: number

	@Field(() => String)
	tariffCode: string

	@Field(() => String)
	tariffName: string

	@Field(() => Boolean)
	isPublicMediaIncluded: boolean

	@Field(() => Boolean)
	isPrivateMediaIncluded: boolean

	@Field(() => Int)
	pricePaid: number

	@Field(() => Int)
	balance: number

	@Field(() => Int)
	includedFileStorageMb: number

	@Field(() => String)
	startsAt: string

	@Field(() => String)
	endsAt: string
}
