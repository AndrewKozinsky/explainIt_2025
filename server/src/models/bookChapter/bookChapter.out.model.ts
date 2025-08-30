import { Field, Int, ObjectType } from '@nestjs/graphql'
import { BookLiteOutModel, BookOutModel } from '../book/book.out.model'

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
}

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
