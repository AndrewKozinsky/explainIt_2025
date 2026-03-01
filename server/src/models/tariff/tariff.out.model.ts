import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TariffOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	code: string

	@Field(() => String)
	slogan: string

	@Field(() => String)
	name: string

	@Field(() => String)
	description: string

	@Field(() => Boolean)
	isPublicMediaIncluded: boolean

	@Field(() => Boolean)
	isPrivateMediaIncluded: boolean

	@Field(() => Int)
	price: number

	@Field(() => Int)
	durationDays: number

	@Field(() => Int)
	includedBalance: number

	@Field(() => Int)
	includedFileStorageMb: number

	@Field(() => Date)
	createdAt: Date
}
