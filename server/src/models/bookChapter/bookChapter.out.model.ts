import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BookChapterOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	bookId: number

	@Field(() => String, { nullable: true })
	name: string | null

	@Field(() => String, { nullable: true })
	header: string | null

	@Field(() => String, { nullable: true })
	content: string | null

	@Field(() => String, { nullable: true })
	note: string | null
}
