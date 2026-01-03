import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UpdateVideoPrivateOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: true })
	name: string | null

	@Field(() => String, { nullable: true })
	text: string | null

	@Field(() => Int)
	userId: number

	@Field(() => String, { nullable: true })
	uploadUrl: string | null
}
