import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BookChapterLiteOutModel } from 'models/bookChapter/bookChapter.out.model'

@ObjectType()
export class TariffOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String)
	author: string

	@Field(() => String)
	name: string

	@Field(() => String)
	note: string

	@Field(() => String)
	cover: string

	@Field(() => String)
	languageCode: string

	@Field(() => [BookChapterLiteOutModel])
	chapters: BookChapterLiteOutModel[]
}
