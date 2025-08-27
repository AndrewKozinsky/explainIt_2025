import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BookChapterLiteOutModel } from '../bookChapter/bookChapter.out.model'

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

	@Field(() => Int)
	userId: number

	@Field(() => [BookChapterLiteOutModel])
	chapters: BookChapterLiteOutModel[]
}

@ObjectType()
export class BookLiteOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: true })
	author: string | null

	@Field(() => String, { nullable: true })
	name: string | null

	@Field(() => String, { nullable: true })
	note: string | null

	@Field(() => Int)
	userId: number
}
