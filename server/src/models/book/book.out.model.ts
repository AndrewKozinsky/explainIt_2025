import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BookChapterLiteOutModel } from '../bookChapter/bookChapter.out.model'

@ObjectType()
export class BookPrivateOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: true })
	author: string | null

	@Field(() => String, { nullable: true })
	name: null | string

	@Field(() => String, { nullable: true })
	languageCode: null | string

	@Field(() => String, { nullable: true })
	note: null | string

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
	author: null | string

	@Field(() => String, { nullable: true })
	name: null | string

	@Field(() => String)
	languageCode: null | string

	@Field(() => String, { nullable: true })
	note: null | string

	@Field(() => Int, { nullable: true })
	userId: null | number
}
