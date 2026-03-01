import { Field, Int, ObjectType } from '@nestjs/graphql'
import { CurrentSubscriptionOutModel } from '../subscription/currentSubscription.out.model'

@ObjectType()
export class UserOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	email: string

	@Field(() => Boolean)
	isUserConfirmed: boolean

	@Field(() => CurrentSubscriptionOutModel, { nullable: true })
	currentSubscription?: CurrentSubscriptionOutModel | null
}
