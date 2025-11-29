import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BookChapterLiteOutModel } from 'src/models/bookChapter/bookChapter.out.model'

@ObjectType()
export class BookPublicOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: true })
	author: string | null

	@Field(() => String, { nullable: true })
	name: string | null

	@Field(() => String, { nullable: true })
	note: string | null

	@Field(() => String)
	cover: string

	@Field(() => [BookChapterLiteOutModel])
	chapters: BookChapterLiteOutModel[]
}
