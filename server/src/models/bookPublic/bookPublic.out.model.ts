import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BookChapterLiteOutModel } from 'models/bookChapter/bookChapter.out.model'

@ObjectType()
export class BookPublicOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	author: string

	@Field(() => String)
	name: string

	@Field(() => String)
	note: string

	@Field(() => [String])
	covers: string[]

	@Field(() => String)
	coverBackgroundColor: string

	@Field(() => String)
	languageCode: string

	@Field(() => Boolean)
	freeToUse: boolean

	@Field(() => [BookChapterLiteOutModel])
	chapters: BookChapterLiteOutModel[]
}
