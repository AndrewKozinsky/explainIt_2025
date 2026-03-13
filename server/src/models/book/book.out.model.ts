import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BookChapterLiteOutModel } from '../bookChapter/bookChapter.out.model'

@ObjectType()
export class BookPrivateOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: true })
	author: string | null

	@Field(() => String, { nullable: true })
	name: string | null

	@Field(() => String)
	languageCode: string

	@Field(() => String, { nullable: true })
	note: string | null

	@Field(() => Int)
	userId: number

	@Field(() => Boolean)
	freeToUse: boolean

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

	@Field(() => String)
	languageCode: string

	@Field(() => String, { nullable: true })
	note: string | null

	@Field(() => Int, { nullable: true })
	userId: null | number
}
