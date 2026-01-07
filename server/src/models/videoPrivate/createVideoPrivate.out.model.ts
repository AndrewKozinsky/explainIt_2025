import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BookChapterLiteOutModel } from '../bookChapter/bookChapter.out.model'

@ObjectType()
export class CreateVideoPrivateOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: true })
	name: string | null

	@Field(() => String, { nullable: true })
	text: string | null

	@Field(() => String, { nullable: true })
	resolvedText: string | null

	@Field(() => Int)
	userId: number
}
