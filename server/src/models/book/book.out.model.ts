import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BookOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: true })
	author: string | null

	@Field(() => String, { nullable: true })
	name: string | null

	@Field(() => String, { nullable: true })
	note: string | null
}
