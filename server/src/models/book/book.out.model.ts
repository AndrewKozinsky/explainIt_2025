import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BookOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	author: string | null

	@Field(() => String)
	name: string | null

	@Field(() => String)
	note: string | null
}
