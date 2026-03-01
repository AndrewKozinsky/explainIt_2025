import { Field, Int, ObjectType } from '@nestjs/graphql'
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
	note: string | null

	@Field(() => String, { nullable: true })
	content: string | null

	@Field(() => [SentenceOutModel], { nullable: true })
	sentences: SentenceOutModel[]

	@Field(() => BookLiteOutModel)
	book: BookLiteOutModel
}

@ObjectType()
export class SentenceOutModel {
	@Field(() => Int)
	id: number

	@Field(() => Int)
	startOffset: number

	@Field(() => Int)
	length: number
}
