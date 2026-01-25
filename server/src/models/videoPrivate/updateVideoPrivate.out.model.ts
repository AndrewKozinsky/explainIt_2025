import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UpdateVideoPrivateOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: true })
	name: null | string

	@Field(() => String, { nullable: true })
	content: null | string

	@Field(() => Int)
	userId: number

	@Field(() => String, { nullable: true })
	uploadUrl: string | null

	@Field(() => Int, { nullable: true })
	fileSizeMb: null | number
}
