import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BookChapterPhraseOutModel } from 'models/bookChapterPhrase/bookChapterPhrase.out.model'
import { BookLiteOutModel } from '../book/book.out.model'

@ObjectType()
export class BookChapterLiteOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	bookId: number

	@Field(() => String, { nullable: true })
	name: string | null

	@Field(() => String, { nullable: true })
	header: string | null

	@Field(() => String, { nullable: true })
	note: string | null
}

@ObjectType()
export class BookChapterOutModel {
	@Field(() => Int)
	id: number

	@Field(() => String, { nullable: true })
	name: string | null

	@Field(() => String, { nullable: true })
	header: string | null

	@Field(() => String, { nullable: true })
	content: string | null

	@Field(() => String, { nullable: true })
	note: string | null

	@Field(() => BookLiteOutModel)
	book: BookLiteOutModel

	@Field(() => [BookChapterPhraseOutModel])
	phrases: BookChapterPhraseOutModel[]
}
